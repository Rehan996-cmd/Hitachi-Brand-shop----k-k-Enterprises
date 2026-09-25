const http = require('http');

http.get('http://localhost:3000', (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    const regex = /href="([^"]+\.css[^"]*)"/;
    const m = body.match(regex);
    console.log('CSS Link:', m ? m[1] : 'none');
    if (m) {
      http.get('http://localhost:3000' + m[1], (cres) => {
        let css = '';
        cres.on('data', d => css += d);
        cres.on('end', () => {
          console.log('CSS total length:', css.length);
          console.log('Contains flex:', css.includes('.flex'));
          console.log('Contains text-white:', css.includes('text-white'));
          console.log('Contains bg-stone:', css.includes('stone'));
          console.log('First 300 chars:\n', css.substring(0, 300));
        });
      });
    }
  });
});
