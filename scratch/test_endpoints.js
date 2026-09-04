const http = require('http');

const urls = [
  '/',
  '/styles.css',
  '/app.js',
  '/assets/storefront.png',
  '/assets/split_ac_airhome.jpg',
  '/assets/window_ac_kaze.svg',
  '/assets/cassette_ac.svg',
  '/assets/vrf_system.svg',
  '/assets/tower_ac.svg',
  '/assets/washing_machine_front.svg',
  '/assets/refrigerator_french.svg',
  '/assets/home_inverter.svg'
];

async function testAll() {
  console.log('Testing localhost:3000 endpoints...');
  let failed = 0;
  for (const p of urls) {
    await new Promise((resolve) => {
      http.get(`http://localhost:3000${p}`, (res) => {
        let size = 0;
        res.on('data', chunk => size += chunk.length);
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log(`✅ [${res.statusCode}] http://localhost:3000${p} (${size} bytes, ${res.headers['content-type']})`);
          } else {
            console.log(`❌ [${res.statusCode}] http://localhost:3000${p}`);
            failed++;
          }
          resolve();
        });
      }).on('error', (err) => {
        console.log(`❌ Error connecting to http://localhost:3000${p}: ${err.message}`);
        failed++;
        resolve();
      });
    });
  }

  if (failed === 0) {
    console.log('\n🎉 ALL 12 URLS AND ASSETS RETURNED STATUS 200 OK!');
  } else {
    console.log(`\n⚠️ ${failed} endpoints failed.`);
  }
}

testAll();
