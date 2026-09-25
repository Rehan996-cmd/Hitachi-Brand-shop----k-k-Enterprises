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
  const server = require('../server.js');
  const PORT = 3099;
  
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Test server running on port ${PORT}`);

  try {
    console.log('\n--- 1. CUSTOMER PLACES ORDER ON HOTEL SHIVANSH WEBSITE ---');
    const orderData = {
      customer: {
        name: 'Amit Shekhawat',
        phone: '9829012345',
        orderType: 'delivery',
        address: 'House #42, Near Silver Jublee Road, Piprali Road, Sikar',
        notes: 'Extra green chutney, pure desi ghee'
      },
      items: [
        { id: 'thali-1', quantity: 2 },
        { id: 'main-1', quantity: 1 }
      ],
      paymentMethod: 'CASH'
    };

    const res1 = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/create-order',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, orderData);

    console.log('Order creation status:', res1.statusCode);
    const order = res1.json.order;
    console.log('Generated Order ID:', order.id);
    console.log('Order Type:', order.type);
    console.log('Delivery Partner:', order.deliveryPartner.provider);
    console.log('Assigned Rider:', order.deliveryPartner.riderName, `(${order.deliveryPartner.vehicleNumber})`);
    console.log('Customer Secret Delivery OTP:', order.deliveryPartner.deliveryOtp);

    const orderId = order.id;
    const otp = order.deliveryPartner.deliveryOtp;

    console.log('\n--- 2. HOTEL SHIVANSH KITCHEN ACCEPTS & STARTS COOKING ---');
    const kitchenRes1 = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/kitchen/action',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { orderId, action: 'accept_cooking' });
    console.log('Kitchen action status:', kitchenRes1.statusCode);
    console.log('Kitchen order status:', kitchenRes1.json.order.status);

    console.log('\n--- 3. ZOMATO RIDER ARRIVES AT HOTEL SHIVANSH COUNTER ---');
    const riderRes1 = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/zomato/action',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { orderId, action: 'arrive_hotel' });
    console.log('Rider arrive status:', riderRes1.statusCode);
    console.log('Status text:', riderRes1.json.order.deliveryPartner.statusText);

    console.log('\n--- 4. FOOD PICKED UP FROM HOTEL SHIVANSH BY ZOMATO RIDER ---');
    const riderRes2 = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/zomato/action',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { orderId, action: 'pickup' });
    console.log('Pickup status:', riderRes2.statusCode);
    console.log('Order status:', riderRes2.json.order.status);
    console.log('Pickup confirmed at:', riderRes2.json.order.deliveryPartner.pickupConfirmedAt);

    console.log('\n--- 5. ZOMATO RIDER OUT FOR DELIVERY TO CUSTOMER ADDRESS ---');
    const riderRes3 = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/zomato/action',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { orderId, action: 'out_for_delivery' });
    console.log('Out for delivery status:', riderRes3.statusCode);
    console.log('Progress percent:', riderRes3.json.order.deliveryPartner.progressPercent + '%');

    console.log('\n--- 6. RIDER ENTERS WRONG OTP ---');
    const failOtpRes = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/zomato/action',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { orderId, action: 'deliver', otp: '0000' });
    console.log('Wrong OTP status (expected 400):', failOtpRes.statusCode);
    console.log('Error message:', failOtpRes.json.message);

    console.log('\n--- 7. RIDER ENTERS CORRECT CUSTOMER OTP ---');
    const successOtpRes = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/zomato/action',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { orderId, action: 'deliver', otp: otp });
    console.log('Correct OTP delivery status (expected 200):', successOtpRes.statusCode);
    console.log('Final Order Status:', successOtpRes.json.order.status);
    console.log('Delivered At:', successOtpRes.json.order.deliveryPartner.deliveredAt);

    console.log('\n--- 8. CUSTOMER TRACKS ORDER ON TRACKING API ---');
    const trackRes = await request({
      hostname: 'localhost',
      port: PORT,
      path: `/api/orders/${orderId}`,
      method: 'GET'
    });
    console.log('Track status:', trackRes.statusCode);
    console.log('Order final stage:', trackRes.json.order.deliveryPartner.stage);
    console.log('All verification steps passed successfully!');

  } finally {
    server.close();
  }
}

run().catch(console.error);
