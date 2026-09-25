const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public', 'assets');
const destDir = path.join(__dirname, '..', 'nextjs-app', 'public', 'assets');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  'shivansh_facade.jpg',
  'dish_paneer.jpg',
  'dish_starters.jpg',
  'dish_biryani.jpg',
  'restaurant_thali.jpg',
  'restaurant_ambiance.jpg',
  'room_deluxe.jpg',
  'room_standard.jpg'
];

files.forEach(function(f) {
  const src = path.join(srcDir, f);
  const dest = path.join(destDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Copied ' + f + ' to Next.js assets');
  } else {
    console.warn('Missing: ' + src);
  }
});

const dataDest = path.join(__dirname, '..', 'nextjs-app', 'src', 'data');
if (!fs.existsSync(dataDest)) fs.mkdirSync(dataDest, { recursive: true });
fs.copyFileSync(path.join(__dirname, '..', 'data', 'products.json'), path.join(dataDest, 'products.json'));
console.log('Copied products.json to nextjs-app/src/data/products.json');
