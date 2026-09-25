const http = require('http');

http.get('http://localhost:3000/styles.css', (r) => {
  console.log('styles.css status:', r.statusCode);
  console.log('Content-Type:', r.headers['content-type']);
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => console.log('Length:', d.length, 'First 100 chars:', d.substring(0, 100)));
});
