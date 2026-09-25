const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Includes Chime:', data.includes('Chime'));
    console.log('Includes Kitchen:', data.includes('Kitchen'));
    console.log('Includes Rider App:', data.includes('Rider App'));
    console.log('Includes Book Room:', data.includes('Book Room'));
    console.log('Includes My Plate:', data.includes('My Plate'));
  });
});
