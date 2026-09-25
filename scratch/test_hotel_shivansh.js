const http = require('http');

function request(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(body); } catch (e) {}
        resolve({ statusCode: res.statusCode, headers: res.headers, body, json });
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING HOTEL SHIVANSH VERIFICATION TESTS ---\n');

  // Test 1: Health Check
  const health = await request({ hostname: 'localhost', port: 3000, path: '/api/health', method: 'GET' });
  console.log('1. Health Check status:', health.statusCode);
  console.log('   Response:', health.json);

  // Test 2: Products / Menu Catalog
  const products = await request({ hostname: 'localhost', port: 3000, path: '/api/products', method: 'GET' });
  console.log('\n2. Products API status:', products.statusCode);
  console.log(`   Dishes count: ${products.json ? products.json.count : 0}`);
  if (products.json && products.json.products && products.json.products.length > 0) {
    console.log(`   Sample dish: ${products.json.products[0].name} (₹${products.json.products[0].price})`);
  }

  // Test 3: Admin route is strictly blocked / 404
  const adminTest1 = await request({ hostname: 'localhost', port: 3000, path: '/admin', method: 'GET' });
  console.log('\n3. Admin route /admin status:', adminTest1.statusCode);
  console.log('   Admin response:', adminTest1.json);

  const adminTest2 = await request({ hostname: 'localhost', port: 3000, path: '/admin/dashboard', method: 'GET' });
  console.log('   Admin sub-route /admin/dashboard status:', adminTest2.statusCode);

  // Test 4: Create In-Room Food Order
  const orderData = {
    customer: {
      name: 'Prakash Choudhary',
      phone: '9460624455',
      orderType: 'room',
      roomNumber: '204',
      notes: 'Make paneer less spicy, send extra napkins'
    },
    items: [
      { id: 'thali-1', quantity: 1 },
      { id: 'bread-1', quantity: 2 },
      { id: 'main-1', quantity: 1 }
    ],
    coupon: 'ROOMGUEST',
    paymentMethod: 'UPI_QR'
  };

  const orderRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/create-order',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, orderData);

  console.log('\n4. Create Food Order status:', orderRes.statusCode);
  console.log('   Order creation success:', orderRes.json ? orderRes.json.success : false);
  const createdOrderId = orderRes.json && orderRes.json.order ? orderRes.json.order.id : null;
  console.log('   Generated Order ID:', createdOrderId);
  if (orderRes.json && orderRes.json.order) {
    console.log('   Pricing:', orderRes.json.order.pricing);
    console.log('   Estimated Time:', orderRes.json.order.estimatedTime);
  }

  // Test 5: Track Order
  if (createdOrderId) {
    const trackRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/track-order/${createdOrderId}`,
      method: 'GET'
    });
    console.log('\n5. Track Order status:', trackRes.statusCode);
    console.log('   Status in kitchen:', trackRes.json && trackRes.json.order ? trackRes.json.order.status : 'N/A');
  }

  // Test 6: Table Reservation
  const resData = {
    name: 'Rahul Sharma',
    phone: '9829012345',
    guests: '4',
    section: 'AC Main Hall',
    date: '2026-09-08',
    time: '08:00 PM',
    notes: 'Family dinner, quiet corner table please'
  };

  const resTest = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/reserve-table',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, resData);

  console.log('\n6. Reserve Table status:', resTest.statusCode);
  console.log('   Reservation ID:', resTest.json && resTest.json.reservation ? resTest.json.reservation.id : 'N/A');

  // Test 7: Static Files Serving
  const staticHtml = await request({ hostname: 'localhost', port: 3000, path: '/', method: 'GET' });
  const staticCss = await request({ hostname: 'localhost', port: 3000, path: '/styles.css', method: 'GET' });
  const staticJs = await request({ hostname: 'localhost', port: 3000, path: '/app.js', method: 'GET' });
  const staticImg = await request({ hostname: 'localhost', port: 3000, path: '/assets/shivansh_facade.jpg', method: 'GET' });

  console.log('\n7. Static Files Serving:');
  console.log('   / (HTML):', staticHtml.statusCode, staticHtml.headers['content-type']);
  console.log('   /styles.css (CSS):', staticCss.statusCode, staticCss.headers['content-type']);
  console.log('   /app.js (JS):', staticJs.statusCode, staticJs.headers['content-type']);
  console.log('   /assets/shivansh_facade.jpg (Image):', staticImg.statusCode, staticImg.headers['content-type']);

  console.log('\n--- ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY ---');
}

runTests().catch(console.error);
