const http = require('http');

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          length: data.length,
          hasTitle: data.includes('Coffee &') || data.includes('Coffee &amp; Toast'),
          hasCraft: data.includes("Sikar's finest craft") || data.includes('Sikar&#x27;s finest craft'),
          hasOfferings: data.includes('Offerings'),
          hasMorningGlow: data.includes('Morning Glow') || data.includes('Morning'),
          hasHowToBuy: data.includes('How to Buy')
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function run() {
  const urls = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3001/menu'
  ];

  for (const url of urls) {
    const res = await checkUrl(url);
    console.log(JSON.stringify(res, null, 2));
  }
}

run();
