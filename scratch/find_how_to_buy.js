const https = require('https');

https.get('https://coffeeandtoast.sikar.my/_next/static/chunks/0vo592-7oo9aw.js', r => {
  let js = '';
  r.on('data', c => js += c);
  r.on('end', () => {
    const idx = js.indexOf('How to Buy?');
    console.log('Index:', idx);
    console.log(js.substring(Math.max(0, idx - 1000), Math.min(js.length, idx + 3500)));
  });
});
