const fs = require('fs');

const files = [
  'restaurant_thali.jpg',
  'dish_paneer.jpg',
  'dish_biryani.jpg',
  'dish_starters.jpg',
  'room_deluxe.jpg',
  'room_standard.jpg',
  'hotel_hero.jpg',
  'restaurant_ambiance.jpg',
  'shivansh_facade.jpg'
];

files.forEach(f => {
  const exists = fs.existsSync(`public/assets/${f}`);
  const size = exists ? fs.statSync(`public/assets/${f}`).size : 0;
  console.log(`${f.padEnd(25)} : ${exists ? 'EXISTS (' + Math.round(size / 1024) + ' KB)' : 'MISSING'}`);
});
