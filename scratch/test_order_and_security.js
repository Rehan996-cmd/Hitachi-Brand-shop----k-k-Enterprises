/**
 * Test script for verifying security hardening, admin disabling, and order/payment APIs
 */
const http = require('http');

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data,
          json
        });
      });
    });

    req.on('error', err => reject(err));
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== STARTING SECURITY & ORDER API VERIFICATION ===\n');
  let passed = 0;
  let failed = 0;

  // TEST 1: Admin route blocked
  try {
    const res = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/admin',
      method: 'GET'
    });
    if (res.statusCode === 404 && res.json && res.json.message && res.json.message.includes('Admin system')) {
      console.log('✅ TEST 1 PASSED: /admin is blocked with 404 & clean disabled message.');
      passed++;
    } else {
      console.log(`❌ TEST 1 FAILED: /admin returned ${res.statusCode}:`, res.data);
      failed++;
    }
  } catch (e) {
    console.log('❌ TEST 1 ERROR:', e.message);
    failed++;
  }

  // TEST 2: Security headers present
  try {
    const res = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    });
    const xfo = res.headers['x-frame-options'];
    const xcto = res.headers['x-content-type-options'];
    const csp = res.headers['content-security-policy'];

    if (xfo === 'DENY' && xcto === 'nosniff' && csp) {
      console.log('✅ TEST 2 PASSED: Security Headers present (X-Frame-Options, X-Content-Type-Options, CSP).');
      passed++;
    } else {
      console.log('❌ TEST 2 FAILED: Missing security headers:', res.headers);
      failed++;
    }
  } catch (e) {
    console.log('❌ TEST 2 ERROR:', e.message);
    failed++;
  }

  // TEST 3: Health check endpoint
  try {
    const res = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/health',
      method: 'GET'
    });
    if (res.statusCode === 200 && res.json && res.json.status === 'ok') {
      console.log('✅ TEST 3 PASSED: Health API /api/health returned 200 OK.');
      passed++;
    } else {
      console.log(`❌ TEST 3 FAILED: /api/health returned ${res.statusCode}`);
      failed++;
    }
  } catch (e) {
    console.log('❌ TEST 3 ERROR:', e.message);
    failed++;
  }

  // TEST 4: Place Order with Server-Side Verification
  let createdOrderId = null;
  try {
    const orderPayload = {
      name: 'Ramesh Sharma',
      phone: '9587111100',
      email: 'ramesh.sharma@example.com',
      address: 'Plot 42, Near Ganpati Tower',
      landmark: 'Opposite Showroom',
      city: 'Sikar',
      pincode: '332001',
      deliverySlot: 'Express Same-Day',
      gstin: '08AAAAA1234A1Z5',
      paymentMethod: 'UPI_QR',
      couponCode: 'HITACHI5000',
      items: [
        { id: 'airhome_400_5s', quantity: 1 }
      ]
    };

    const res = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/orders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, orderPayload);

    if (res.statusCode === 201 && res.json && res.json.success && res.json.order) {
      createdOrderId = res.json.order.id;
      const order = res.json.order;
      console.log(`✅ TEST 4 PASSED: Order created with ID: ${createdOrderId}, Grand Total: ₹${order.pricing.grandTotal}`);
      passed++;
    } else {
      console.log(`❌ TEST 4 FAILED: Order creation failed: ${res.statusCode}`, res.data);
      failed++;
    }
  } catch (e) {
    console.log('❌ TEST 4 ERROR:', e.message);
    failed++;
  }

  // TEST 5: Track Order
  if (createdOrderId) {
    try {
      const res = await makeRequest({
        hostname: 'localhost',
        port: 3000,
        path: `/api/orders/${createdOrderId}`,
        method: 'GET'
      });
      if (res.statusCode === 200 && res.json && res.json.order && res.json.order.id === createdOrderId) {
        console.log(`✅ TEST 5 PASSED: Track Order /api/orders/${createdOrderId} verified successfully.`);
        passed++;
      } else {
        console.log(`❌ TEST 5 FAILED: Track Order returned ${res.statusCode}`);
        failed++;
      }
    } catch (e) {
      console.log('❌ TEST 5 ERROR:', e.message);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  process.exit(failed === 0 ? 0 : 1);
}

runTests();
