const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          length: data.length
        });
      });
    }).on('error', (err) => resolve({ url, error: err.message }));
  });
}

async function run() {
  const home = await fetchUrl('http://localhost:3000');
  const menu = await fetchUrl('http://localhost:3000/menu');
  const logo = await fetchUrl('http://localhost:3000/logo.jpg');
  const bg = await fetchUrl('http://localhost:3000/2.webp');
  const photo1 = await fetchUrl('http://localhost:3000/1.jpeg');
  
  console.log('Results:', { home, menu, logo, bg, photo1 });
}

run();
