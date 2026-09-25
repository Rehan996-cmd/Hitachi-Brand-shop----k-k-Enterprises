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

async function run() {
  const PORT = 3000;
  console.log(`\n======================================================`);
  console.log(`🏨 TESTING HOTEL SHIVANSH & ZOMATO WIN-WIN SYSTEM`);
  console.log(`======================================================\n`);

  // Step 1: Health & Catalog check
  console.log('[1] Checking Server Health & Menu Catalog...');
  const healthRes = await request({ hostname: 'localhost', port: PORT, path: '/api/health', method: 'GET' });
  if (healthRes.statusCode !== 200) throw new Error(`Health check failed: ${healthRes.statusCode}`);
  console.log(`    ✓ Server Online! Food items count: ${healthRes.json.foodItemsCount}`);

  // Step 2: Customer places a high-value order (e.g. 2 Thalis + 1 Paneer Butter Masala)
  console.log('\n[2] Customer Places Order via Website (Order Type: Delivery)...');
  const orderPayload = {
    customer: {
      name: 'Raghav Sharma',
      phone: '9829055443',
      orderType: 'delivery',
      address: 'Near Court Road, Nawalgarh Road, Sikar (Rajasthan)',
      notes: 'Extra butter on rotis, send fresh salad'
    },
    items: [
      { id: 'thali-1', quantity: 2 },
      { id: 'main-1', quantity: 1 }
    ],
    paymentMethod: 'UPI_QR'
  };

  const createRes = await request({
    hostname: 'localhost',
    port: PORT,
    path: '/api/create-order',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, orderPayload);

  if (createRes.statusCode !== 201) throw new Error(`Order creation failed: ${createRes.statusCode}`);
  const order = createRes.json.order;
  console.log(`    ✓ Order Created: ${order.id}`);
  console.log(`    ✓ Delivery Partner: ${order.deliveryPartner.provider} (${order.deliveryPartner.brand})`);
  console.log(`    ✓ Assigned Rider: ${order.deliveryPartner.riderName} [Vehicle: ${order.deliveryPartner.vehicleNumber}]`);
  console.log(`    ✓ Secret 4-Digit Delivery OTP: ${order.deliveryPartner.deliveryOtp}`);

  // Step 3: Validate Win-Win Financial Settlement (होटल और जोमैटो दोनों का फायदा)
  console.log('\n[3] Validating Win-Win Financial Settlement for Both Parties...');
  const s = order.settlement;
  if (!s) throw new Error('Settlement calculation missing from order!');

  console.log(`    --- होटल वालों का फायदा (HOTEL SHIVANSH ADVANTAGES) ---`);
  console.log(`    • Food Bill Revenue: ₹${s.foodRevenue}`);
  console.log(`    • Hotel Net Retained Earnings: ₹${s.hotelNetEarning}`);
  console.log(`    • Commission Saved vs 22% Aggregator Cut: ₹${s.hotelCommissionSaved} (DIRECT PROFIT KEPT BY HOTEL)`);
  console.log(`    • Direct Customer Access: Phone (${order.customer.phone}) & Address retained for loyalty.`);

  console.log(`\n    --- जोमैटो व राइडर का फायदा (ZOMATO & RIDER ADVANTAGES) ---`);
  console.log(`    • Zomato 3PL Express Logistics Fee: ₹${s.zomatoLogisticsFee} (Guaranteed per-trip platform fee)`);
  console.log(`    • Rider Trip Payout: ₹${s.riderTripPayout} (Base payout for Sikar fleet)`);
  console.log(`    • Rider On-Time & OTP Bonus: ₹${s.riderBonus}`);
  console.log(`    • Total Rider Earning: ₹${s.totalRiderEarning} (Credited to Vikram Saini's daily wallet)`);
  console.log(`    • Fraud Protection: 4-digit OTP prevents false dispute & chargeback losses.`);

  // Step 4: Hotel Kitchen Action
  console.log('\n[4] Hotel Kitchen Starts Cooking & Dispatches Zomato...');
  const kRes1 = await request({
    hostname: 'localhost', port: PORT, path: '/api/kitchen/action', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: order.id, action: 'accept_cooking' });
  console.log(`    ✓ Kitchen Status: ${kRes1.json.order.status}`);

  // Step 5: Rider Arrives at Hotel
  console.log('\n[5] Zomato Rider Arrives at Hotel Shivansh Counter (Salasar Road)...');
  const rRes1 = await request({
    hostname: 'localhost', port: PORT, path: '/api/zomato/action', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: order.id, action: 'arrive_hotel' });
  console.log(`    ✓ Rider Status: ${rRes1.json.order.deliveryPartner.statusText}`);

  // Step 6: Food Handover & Pickup
  console.log('\n[6] Hot Sealed Food Handover to Rider Vikram Saini...');
  const rRes2 = await request({
    hostname: 'localhost', port: PORT, path: '/api/zomato/action', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: order.id, action: 'pickup' });
  console.log(`    ✓ Pickup Confirmed: ${rRes2.json.order.deliveryPartner.stage}`);

  // Step 7: Rider Starts Transit to Customer Doorstep
  console.log('\n[7] Rider Out for Doorstep Delivery in Sikar...');
  const rRes3 = await request({
    hostname: 'localhost', port: PORT, path: '/api/zomato/action', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: order.id, action: 'out_for_delivery' });
  console.log(`    ✓ Transit Progress: ${rRes3.json.order.deliveryPartner.progressPercent}%`);

  // Step 8: Security Test - Wrong OTP Rejected
  console.log('\n[8] Security Test: Rider Attempts Wrong OTP (0000)...');
  const wrongOtpRes = await request({
    hostname: 'localhost', port: PORT, path: '/api/zomato/action', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: order.id, action: 'deliver', otp: '0000' });
  if (wrongOtpRes.statusCode !== 400) throw new Error('Security flaw: Wrong OTP was not rejected!');
  console.log(`    ✓ Blocked with HTTP 400: "${wrongOtpRes.json.message}"`);

  // Step 9: Correct OTP Verification & Delivery Completion
  console.log('\n[9] Correct OTP Verification & Order Handover...');
  const correctOtpRes = await request({
    hostname: 'localhost', port: PORT, path: '/api/zomato/action', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: order.id, action: 'deliver', otp: order.deliveryPartner.deliveryOtp });
  if (correctOtpRes.statusCode !== 200) throw new Error('Delivery completion failed!');
  console.log(`    ✓ Delivery Success: "${correctOtpRes.json.message}"`);
  console.log(`    ✓ Final Status: ${correctOtpRes.json.order.status}`);

  console.log(`\n======================================================`);
  console.log(`🎉 ALL WIN-WIN VERIFICATIONS COMPLETED SUCCESSFULLY!`);
  console.log(`   🏨 Hotel Shivansh Profit Retained: ₹${s.hotelNetEarning} (Saved ₹${s.hotelCommissionSaved})`);
  console.log(`   🛵 Zomato & Rider Payout Guaranteed: ₹${s.zomatoLogisticsFee + s.totalRiderEarning}`);
  console.log(`======================================================\n`);
}

run().catch(err => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
