const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('data/hotel_products.json', 'utf8'));

// Normalize image paths to /assets/...
const normalized = raw.map(item => {
  let img = item.image || item.photo_url || '/assets/restaurant_thali.jpg';
  if (!img.startsWith('/') && !img.startsWith('http')) {
    img = '/' + img;
  }
  return {
    ...item,
    image: img,
    photo_url: img,
    title: item.name
  };
});

fs.writeFileSync('data/products.json', JSON.stringify(normalized, null, 2), 'utf8');
console.log(`Successfully normalized and wrote ${normalized.length} Hotel Shivansh products to data/products.json`);
