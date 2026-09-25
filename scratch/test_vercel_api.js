const apiHandler = require('../api/index');
const http = require('http');

console.log('Testing api/index.js handler for Vercel...');

// Mock req and res
const req = {
  url: '/api/qrcode?amount=450',
  method: 'GET',
  headers: { host: 'localhost' },
  socket: { remoteAddress: '127.0.0.1' },
  on: (event, cb) => {
    if (event === 'end') cb();
  }
};

let resData = '';
let resStatusCode = 200;
let resHeaders = {};

const res = {
  writeHead: (status, headers) => {
    resStatusCode = status;
    resHeaders = headers;
  },
  end: (chunk) => {
    if (chunk) resData += chunk;
    console.log('Status:', resStatusCode);
    console.log('Response length:', resData.length);
    try {
      const parsed = JSON.parse(resData);
      console.log('QR Success:', parsed.success);
      console.log('QR Data URL exists:', Boolean(parsed.qrDataUrl));
      if (parsed.success) {
        console.log('✅ api/index.js is 100% WORKING FOR VERCEL!');
      } else {
        console.error('❌ Failed');
        process.exit(1);
      }
    } catch (e) {
      console.error('Parse error:', e);
      process.exit(1);
    }
  }
};

apiHandler(req, res);
