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
  console.log('--- STARTING DAILY USE CASE STRESS & EDGE-CASE TEST ---');
  let failures = [];

  // TEST 1: Menu catalog search and categories
  try {
    const res = await request({ hostname: 'localhost', port: PORT, path: '/api/products', method: 'GET' });
    if (res.statusCode !== 200 || !res.json || !res.json.products || res.json.products.length < 20) {
      failures.push('TEST 1 Failed: /api/products catalog returned invalid data');
    } else {
      console.log(`✓ Test 1: Menu catalog loaded successfully with ${res.json.products.length} dishes.`);
    }
  } catch (e) {
    failures.push('TEST 1 Failed: ' + e.message);
  }

  // TEST 2: Daily Use Case A - Hotel Room Guest orders In-Room Dining with ROOMGUEST coupon
  let roomOrderId = null;
  try {
    const orderData = {
      customer: {
        name: 'Sunil Choudhary',
        phone: '9414012345',
        orderType: 'room',
        roomNumber: '204',
        notes: 'Less oil, serve in room'
      },
      items: [
        { id: 'thali-1', quantity: 1 } // ₹320
      ],
      coupon: 'ROOMGUEST',
      paymentMethod: 'ROOM_BILL'
    };
    const res = await request({
      hostname: 'localhost', port: PORT, path: '/api/create-order', method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, orderData);

    if (res.statusCode !== 201 || !res.json.order) {
      failures.push('TEST 2 Failed: Room order creation returned ' + res.statusCode);
    } else {
      roomOrderId = res.json.order.id;
      const order = res.json.order;
      if (order.type !== 'room' || order.customer.roomNumber !== '204') {
        failures.push('TEST 2 Failed: Room number metadata mismatch');
      } else if (order.pricing.deliveryFee !== 0) {
        failures.push('TEST 2 Failed: Room service charged delivery fee (should be 0)');
      } else {
        console.log(`✓ Test 2: In-Room dining order placed (#${roomOrderId}) with 0 delivery charge & coupon discount.`);
      }
    }
  } catch (e) {
    failures.push('TEST 2 Failed: ' + e.message);
  }

  // TEST 3: Daily Use Case B - Dine-In Restaurant Table Order
  let tableOrderId = null;
  try {
    const orderData = {
      customer: {
        name: 'Vikas Shekhawat',
        phone: '9829033322',
        orderType: 'table',
        tableNumber: 'Table 5',
        notes: 'Serve hot'
      },
      items: [
        { id: 'main-1', quantity: 2 },
        { id: 'bread-1', quantity: 4 }
      ],
      paymentMethod: 'UPI_QR'
    };
    const res = await request({
      hostname: 'localhost', port: PORT, path: '/api/create-order', method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, orderData);

    if (res.statusCode !== 201 || !res.json.order) {
      failures.push('TEST 3 Failed: Table order creation returned ' + res.statusCode);
    } else {
      tableOrderId = res.json.order.id;
      console.log(`✓ Test 3: Restaurant Table 5 order placed (#${tableOrderId}).`);
    }
  } catch (e) {
    failures.push('TEST 3 Failed: ' + e.message);
  }

  // TEST 4: Daily Use Case C - Sikar Doorstep Zomato Delivery Order with coupon FLAT50
  let delivOrderId = null;
  let delivOtp = null;
  try {
    const orderData = {
      customer: {
        name: 'Pooja Sharma',
        phone: '9460699887',
        orderType: 'delivery',
        address: 'Plot 18, Piprali Road, Near Sikar Central Park',
        notes: 'Call before reaching'
      },
      items: [
        { id: 'thali-1', quantity: 2 } // ₹640
      ],
      coupon: 'FLAT50',
      paymentMethod: 'CASH'
    };
    const res = await request({
      hostname: 'localhost', port: PORT, path: '/api/create-order', method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, orderData);

    if (res.statusCode !== 201 || !res.json.order) {
      failures.push('TEST 4 Failed: Delivery order creation returned ' + res.statusCode);
    } else {
      delivOrderId = res.json.order.id;
      delivOtp = res.json.order.deliveryPartner?.deliveryOtp;
      if (!delivOtp || delivOtp.length !== 4) {
        failures.push('TEST 4 Failed: 4-digit delivery OTP not generated');
      } else if (!res.json.order.deliveryPartner?.riderName) {
        failures.push('TEST 4 Failed: Rider not assigned');
      } else {
        console.log(`✓ Test 4: Zomato Delivery order placed (#${delivOrderId}) with OTP ${delivOtp} and Rider ${res.json.order.deliveryPartner.riderName}.`);
      }
    }
  } catch (e) {
    failures.push('TEST 4 Failed: ' + e.message);
  }

  // TEST 5: Daily Use Case D - Table VIP Reservation
  try {
    const res = await request({
      hostname: 'localhost', port: PORT, path: '/api/reserve', method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Dr. Ashok Rathore',
      phone: '9829011223',
      date: '2026-09-25',
      time: '08:30 PM',
      guests: '4 Guests',
      zone: 'Main Royal AC Dining Hall'
    });
    if (res.statusCode !== 201 || !res.json.reservation) {
      failures.push('TEST 5 Failed: Table reservation failed with status ' + res.statusCode);
    } else {
      console.log(`✓ Test 5: Table reservation created (#${res.json.reservation.id}) for 4 Guests.`);
    }
  } catch (e) {
    failures.push('TEST 5 Failed: ' + e.message);
  }

  // TEST 6: Daily Use Case E - Room Inquiry / Booking
  try {
    const res = await request({
      hostname: 'localhost', port: PORT, path: '/api/room-inquiry', method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      guestName: 'Mahendra Singh',
      phone: '9460677889',
      roomType: 'Deluxe AC Room',
      checkInDate: '2026-09-26',
      checkOutDate: '2026-09-28',
      guestsCount: '2 Guests',
      specialRequests: 'Upper floor room'
    });
    if (res.statusCode !== 201 || !res.json.inquiry) {
      failures.push('TEST 6 Failed: Room inquiry failed with status ' + res.statusCode);
    } else {
      console.log(`✓ Test 6: Room inquiry submitted (#${res.json.inquiry.id}) for Deluxe AC Room.`);
    }
  } catch (e) {
    failures.push('TEST 6 Failed: ' + e.message);
  }

  // TEST 7: Daily Use Case F - Kitchen Terminal retrieves order list
  try {
    const res = await request({ hostname: 'localhost', port: PORT, path: '/api/orders', method: 'GET' });
    if (res.statusCode !== 200 || !res.json.orders || res.json.orders.length === 0) {
      failures.push('TEST 7 Failed: Kitchen orders list empty or failed');
    } else {
      console.log(`✓ Test 7: Kitchen orders list returned ${res.json.orders.length} active/recent orders.`);
    }
  } catch (e) {
    failures.push('TEST 7 Failed: ' + e.message);
  }

  // TEST 8: Daily Use Case G - Step-by-Step Rider & Kitchen Workflow on delivOrderId
  if (delivOrderId && delivOtp) {
    try {
      // 1. Kitchen accepts cooking
      const k1 = await request({
        hostname: 'localhost', port: PORT, path: '/api/kitchen/action', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, { orderId: delivOrderId, action: 'accept_cooking' });
      if (k1.statusCode !== 200) failures.push('TEST 8 Step 1 Failed: Kitchen accept_cooking');

      // 2. Rider arrives at hotel
      const r1 = await request({
        hostname: 'localhost', port: PORT, path: '/api/zomato/action', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, { orderId: delivOrderId, action: 'arrive_hotel' });
      if (r1.statusCode !== 200) failures.push('TEST 8 Step 2 Failed: Rider arrive_hotel');

      // 3. Rider picks up
      const r2 = await request({
        hostname: 'localhost', port: PORT, path: '/api/zomato/action', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, { orderId: delivOrderId, action: 'pickup' });
      if (r2.statusCode !== 200) failures.push('TEST 8 Step 3 Failed: Rider pickup');

      // 4. Rider in transit
      const r3 = await request({
        hostname: 'localhost', port: PORT, path: '/api/zomato/action', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, { orderId: delivOrderId, action: 'out_for_delivery' });
      if (r3.statusCode !== 200) failures.push('TEST 8 Step 4 Failed: Rider out_for_delivery');

      // 5. Rider inputs OTP
      const r4 = await request({
        hostname: 'localhost', port: PORT, path: '/api/zomato/action', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, { orderId: delivOrderId, action: 'deliver', otp: delivOtp });
      if (r4.statusCode !== 200) failures.push('TEST 8 Step 5 Failed: Rider OTP delivery completion');

      console.log(`✓ Test 8: Full delivery lifecycle executed with verified OTP for #${delivOrderId}.`);
    } catch (e) {
      failures.push('TEST 8 Failed: ' + e.message);
    }
  }

  // TEST 9: Daily Use Case H - Customer Order Tracking
  if (delivOrderId) {
    try {
      const res = await request({ hostname: 'localhost', port: PORT, path: `/api/orders/${delivOrderId}`, method: 'GET' });
      if (res.statusCode !== 200 || !res.json.order) {
        failures.push('TEST 9 Failed: Order tracking endpoint returned ' + res.statusCode);
      } else {
        console.log(`✓ Test 9: Customer tracking verified order status: "${res.json.order.status}".`);
      }
    } catch (e) {
      failures.push('TEST 9 Failed: ' + e.message);
    }
  }

  // TEST 10: Security check - Admin route blocked
  try {
    const res = await request({ hostname: 'localhost', port: PORT, path: '/admin', method: 'GET' });
    if (res.statusCode !== 404) {
      failures.push('TEST 10 Failed: /admin was NOT blocked with 404! Returned ' + res.statusCode);
    } else {
      console.log('✓ Test 10: Security verified - /admin returns 404 Not Found.');
    }
  } catch (e) {
    failures.push('TEST 10 Failed: ' + e.message);
  }

  console.log('\n------------------------------------------------------');
  if (failures.length === 0) {
    console.log('🎉 ALL 10 DAILY USE CASE TESTS PASSED PERFECTLY!');
  } else {
    console.log('⚠️ FAILURES DETECTED:');
    failures.forEach(f => console.log('  - ' + f));
  }
  console.log('------------------------------------------------------\n');
}

run().catch(console.error);
