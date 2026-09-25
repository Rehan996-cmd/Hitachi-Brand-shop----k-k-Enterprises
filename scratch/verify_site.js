const http = require('http');

const paths = [
  '/',
  '/styles.css',
  '/premium-enhancements.css',
  '/app.js',
  '/premium-ui.js',
  '/api/products',
  '/assets/shivansh_facade.jpg',
  '/assets/restaurant_thali.jpg',
  '/assets/hotel_room_luxury.jpg',
  '/assets/dal_bati_churma.jpg',
  '/assets/paneer_butter_masala.jpg'
];

async function run() {
  for (const p of paths) {
    await new Promise(resolve => {
      http.get('http://localhost:3000' + p, res => {
        console.log((res.statusCode === 200 ? '[OK]' : '[ERR]') + ' ' + p + ' -> ' + res.statusCode);
        resolve();
      }).on('error', err => {
        console.log('[FAIL] ' + p + ' -> ' + err.message);
        resolve();
      });
    });
  }
}

run();
