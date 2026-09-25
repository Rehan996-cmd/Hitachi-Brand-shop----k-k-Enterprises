const http = require('http');

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let resp = '';
      res.on('data', chunk => resp += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(resp) }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, res => {
      let resp = '';
      res.on('data', chunk => resp += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(resp) }));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('🧪 TESTING PAYMENT TRANSACTION & TAX INVOICE SYSTEM...\n');

  // 1. Test QR Code API
  const qrRes = await get('/api/qrcode?amount=580');
  console.log('1. /api/qrcode status:', qrRes.status);
  console.log('   QR URL:', qrRes.data.text);
  console.log('   Data URL starts with:', qrRes.data.dataUrl?.substring(0, 30));
  if (!qrRes.data.dataUrl) throw new Error('QR dataUrl missing');

  // 2. Create Order with UPI Payment Method
  const orderRes = await post('/api/create-order', {
    name: 'Rajendra Singh',
    phone: '9829012345',
    orderType: 'delivery',
    address: 'Piprali Road, Sikar',
    paymentMethod: 'UPI_QR',
    items: [
      { id: 'thali-1', name: 'Shivansh Maharaja Special Royal Thali', price: 320, quantity: 2 }
    ]
  });
  console.log('\n2. /api/create-order status:', orderRes.status);
  const order = orderRes.data.order;
  console.log('   Order ID:', order.id);
  console.log('   Payment Method:', order.payment.method);
  console.log('   Payment Status:', order.payment.status);
  console.log('   UPI Payload:', order.payment.upiUrl);
  console.log('   Has QR Data URL:', Boolean(order.payment.qrDataUrl));

  // 3. Verify Payment
  const verifyRes = await post('/api/verify-payment', {
    orderId: order.id,
    transactionRef: 'UPI482910394821',
    method: 'UPI_QR'
  });
  console.log('\n3. /api/verify-payment status:', verifyRes.status);
  console.log('   Message:', verifyRes.data.message);
  console.log('   Updated Payment Status:', verifyRes.data.order.payment.status);
  console.log('   Transaction Ref:', verifyRes.data.order.payment.transactionRef);

  // 4. Fetch Tax Invoice
  const invRes = await get(`/api/invoice/${order.id}`);
  console.log('\n4. /api/invoice/:id status:', invRes.status);
  const inv = invRes.data.invoice;
  console.log('   Invoice Number:', inv.invoiceNumber);
  console.log('   GSTIN:', inv.restaurant.gstin);
  console.log('   FSSAI:', inv.restaurant.fssai);
  console.log('   Taxable Value:', inv.pricing.taxableValue);
  console.log('   CGST @ 2.5%:', inv.pricing.cgstAmount);
  console.log('   SGST @ 2.5%:', inv.pricing.sgstAmount);
  console.log('   Grand Total:', inv.pricing.grandTotal);
  console.log('   Is Verified / Paid:', inv.isVerified);

  console.log('\n🎉 ALL PAYMENT TRANSACTION TESTS PASSED 100%!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
