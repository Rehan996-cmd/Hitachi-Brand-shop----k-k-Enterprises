const http = require('http');

http.get('http://localhost:3001', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Next.js app status: ${res.statusCode}`);
    console.log(`Contains 'Hotel Shivansh': ${data.includes('Hotel Shivansh')}`);
  });
}).on('error', (e) => {
  console.error('Error connecting to Next.js app:', e.message);
});
