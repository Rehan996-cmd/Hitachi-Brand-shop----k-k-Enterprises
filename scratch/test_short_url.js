const https = require('https');

function testAlias(alias) {
  const url = `https://tinyurl.com/api-create.php?url=https://temporary-flying-boron-ymj0cnx.vercel.app&alias=${alias}`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log(`Alias '${alias}' response:`, data);
    });
  }).on('error', e => console.error(e));
}

testAlias('shivansh-hotel-sikar');
testAlias('shivanshhotelsikar');
testAlias('hotelshivansh');
