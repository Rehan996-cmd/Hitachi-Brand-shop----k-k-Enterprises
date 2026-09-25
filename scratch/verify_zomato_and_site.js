const http = require('http');

http.get('http://localhost:3001', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    console.log('Content length:', data.length);
    
    // Check Zomato presence
    const zomatoMatches = (data.match(/zomato\.com/gi) || []).length;
    console.log('Zomato links count in HTML:', zomatoMatches);

    // Check hotel title
    const hasTitle = data.includes('Hotel Shivansh') || data.includes('HOTEL SHIVANSH');
    console.log('Has Hotel Shivansh title:', hasTitle);

    // Check key components
    console.log('Has Royal Menu:', data.includes('Royal Menu') || data.includes('royal'));
    console.log('Has In-Room Dining:', data.includes('In-Room'));
    console.log('Has Table Reservation:', data.includes('Reserve'));

    if (res.statusCode === 200 && zomatoMatches > 0 && hasTitle) {
      console.log('SUCCESS: All checks passed!');
      process.exit(0);
    } else {
      console.error('FAILURE: Checks failed');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Error connecting to http://localhost:3001:', err.message);
  process.exit(1);
});
