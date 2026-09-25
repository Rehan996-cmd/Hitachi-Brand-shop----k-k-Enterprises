const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'data', 'hotel_products.json');
const dest1 = path.join(__dirname, '..', 'data', 'products.json');
const dest2 = path.join(__dirname, '..', 'nextjs-app', 'src', 'data', 'products.json');

const raw = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

// Ensure all image paths have leading slash
const updated = raw.map(item => {
  let img = item.image || item.photo_url || '';
  if (img && !img.startsWith('/') && !img.startsWith('http')) {
    img = '/' + img;
  }
  return {
    ...item,
    image: img,
    photo_url: img
  };
});

fs.writeFileSync(dest1, JSON.stringify(updated, null, 2), 'utf8');
fs.writeFileSync(dest2, JSON.stringify(updated, null, 2), 'utf8');

console.log(`Successfully migrated ${updated.length} Hotel Shivansh dishes to products.json`);
