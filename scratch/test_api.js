const http = require('http');

http.get('http://localhost:3001/api/products', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('API Status:', res.statusCode);
      console.log('Products Count:', json.length);
      console.log('First 3 Dishes:');
      json.slice(0, 3).forEach(d => console.log(` - [${d.category}] ${d.name} (₹${d.price})`));
    } catch (e) {
      console.error('Failed to parse JSON:', e);
    }
  });
}).on('error', console.error);
