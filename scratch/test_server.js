const http = require('http');

http.get('http://localhost:3000', (res) => {
  console.log('STATUS:', res.statusCode);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('HTML Length:', data.length);
    console.log('Contains HOTEL SHIVANSH:', data.includes('HOTEL SHIVANSH'));
    console.log('Contains Mobile Navigation Bar:', data.includes('Mobile Navigation Bar'));
    console.log('Contains VIP Suites:', data.includes('VIP Suites'));
    console.log('Contains Table Reservation Chips:', data.includes('No. of Guests *'));
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
