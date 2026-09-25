const fs = require('fs');
const path = require('path');

const products = require('../nextjs-app/src/data/products.json');
console.log('Total dishes:', products.length);

const categories = {};
const images = new Set();
const missingImages = [];

products.forEach(p => {
  categories[p.categoryName || p.category] = (categories[p.categoryName || p.category] || 0) + 1;
  images.add(p.image);
  const fullPath = path.join(__dirname, '..', 'nextjs-app', 'public', p.image);
  if (!fs.existsSync(fullPath)) {
    missingImages.push({ name: p.name, img: p.image });
  }
});

console.log('\nCategories:');
console.table(categories);

console.log('\nUnique Images referenced in products.json:', [...images]);
console.log('Missing images count:', missingImages.length);
if (missingImages.length > 0) {
  console.log('Missing samples:', missingImages.slice(0, 5));
}
