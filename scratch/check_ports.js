const http = require('http');

function check(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          headers: res.headers,
          preview: data.slice(0, 300)
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function main() {
  const p3000 = await check('http://localhost:3000');
  const p3001 = await check('http://localhost:3001');
  console.log('--- Port 3000 ---', JSON.stringify(p3000, null, 2));
  console.log('--- Port 3001 ---', JSON.stringify(p3001, null, 2));
}

main();
