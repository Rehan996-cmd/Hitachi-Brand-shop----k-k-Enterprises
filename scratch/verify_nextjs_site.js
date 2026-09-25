const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('--- Verifying Next.js App on Port 3001 ---');
  const res3001 = await fetchUrl('http://localhost:3001/');
  console.log(`Port 3001 HTTP Status: ${res3001.status}`);
  console.log(`Contains 'Hotel Shivansh': ${res3001.body.includes('Hotel Shivansh')}`);
  console.log(`Contains 'Coffee & Toast': ${res3001.body.toLowerCase().includes('coffee & toast')}`);
  console.log(`Contains 'Rajputana': ${res3001.body.includes('Rajputana')}`);
  console.log(`Contains 'Thali': ${res3001.body.includes('Thali')}`);
  console.log(`Contains 'In-Room Dining': ${res3001.body.includes('In-Room Dining')}`);
  console.log(`Contains '94606 24455': ${res3001.body.includes('94606 24455') || res3001.body.includes('9460624455')}`);

  console.log('\n--- Verifying Node/Vanilla App on Port 3000 ---');
  const res3000 = await fetchUrl('http://localhost:3000/');
  console.log(`Port 3000 HTTP Status: ${res3000.status}`);
  console.log(`Contains 'Hotel Shivansh': ${res3000.body.includes('Hotel Shivansh')}`);
  console.log(`Contains 'Coffee & Toast': ${res3000.body.toLowerCase().includes('coffee & toast')}`);

  if (res3001.status === 200 && !res3001.body.toLowerCase().includes('coffee & toast')) {
    console.log('\n SUCCESS: Both sites are running purely for Hotel Shivansh with 0 Coffee & Toast mentions!');
  } else {
    console.error('\n FAILURE: Check issues above.');
    process.exit(1);
  }
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
