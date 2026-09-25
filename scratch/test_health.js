const http = require('http');

http.get('http://localhost:3000/api/health', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('HEALTH CHECK RESULT:', res.statusCode);
    console.log('BODY:', data);
  });
}).on('error', (err) => {
  console.error('Health check error:', err.message);
});
