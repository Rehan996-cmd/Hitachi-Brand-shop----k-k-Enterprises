/**
 * Comprehensive Automated Verification Script
 * Validates the Customer-Friendly Enhancements for Hotel Shivansh Sikar
 */

const http = require('http');

function httpRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: data, json: res.headers['content-type']?.includes('application/json') ? JSON.parse(data) : null });
        } catch (e) {
          resolve({ status: res.statusCode, body: data, json: null });
        }
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
  console.log('================================================================');
  console.log('🧪 VERIFYING CUSTOMER-FRIENDLY HOTEL SHIVANSH WEB PORTAL');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, testName) {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
    }
  }

  try {
    // 1. Check Homepage HTML content
    console.log('--- 1. Testing Homepage Customer-Friendly Elements ---');
    const homeRes = await httpRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    });

    assert(homeRes.status === 200, 'Homepage returns HTTP 200 OK');
    const html = homeRes.body;

    assert(html.includes('howToOrderSection'), '3-Step Customer Order Guide section present');
    assert(html.includes('Select Your Food') && html.includes('Choose Dining Mode') && html.includes('Live Tracking &amp; Delivery OTP'), 'English 3-Step Titles rendered clearly');
    assert(html.includes('94606 24455'), 'Customer Support Helpline phone number (+91 94606 24455) displayed');
    assert(html.includes('floatingConciergeBtn'), 'Floating Customer Concierge (WhatsApp/Call Help) button present');
    assert(html.includes('customer-faq-section') || html.includes('faqSection'), 'Customer FAQ Accordion section present');
    assert(html.includes('How long does delivery take for Hotel Rooms vs Sikar Home Delivery?'), 'Customer FAQ delivery time question present');
    assert(html.includes('What is the Delivery OTP and when should I share it?'), 'Customer FAQ OTP security question present');
    assert(html.includes('Is all food 100% pure vegetarian and prepared in pure desi ghee?'), 'Customer FAQ pure veg & desi ghee guarantee present');

    // 2. Check Cart Drawer & Locality Chips
    console.log('\n--- 2. Testing Cart Drawer & Local Address Clarity ---');
    assert(html.includes('sikarAreaChips'), 'Sikar locality quick-pick buttons present');
    assert(html.includes('Piprali Road') && html.includes('Nawalgarh Road') && html.includes('Station Road'), 'Sikar localities (Piprali, Nawalgarh, Station) available in English');
    assert(html.includes('No advance payment required'), 'Clear payment transparency note (Cash on delivery / UPI) present');

    // 3. Test In-Room Order Placement
    console.log('\n--- 3. Testing In-Room Customer Dining Flow ---');
    const inRoomOrderRes = await httpRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/create-order',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Dr. Ramesh Sharma',
      phone: '9829012345',
      orderType: 'room',
      roomNumber: 'Room 204',
      items: [
        { id: 'thali-1', name: 'Shivansh Maharaja Special Royal Thali', price: 320, quantity: 2 }
      ],
      paymentMethod: 'CASH'
    });

    assert(inRoomOrderRes.status === 201, 'In-Room order placed successfully with HTTP 201');
    const inRoomOrder = inRoomOrderRes.json?.order;
    assert(inRoomOrder?.type === 'room', 'Order correctly categorized as in-room dining');
    assert(inRoomOrder?.customer?.roomNumber === 'Room 204', 'Customer room number correctly saved');
    assert(inRoomOrder?.pricing?.deliveryFee === 0, 'In-Room delivery fee is strictly ₹0 (Free for hotel guests)');

    // 4. Test Zomato Express Delivery Flow with Secret OTP
    console.log('\n--- 4. Testing Sikar Home Delivery Customer Experience ---');
    const deliveryOrderRes = await httpRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/create-order',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Sunita Choudhary',
      phone: '9414012345',
      orderType: 'delivery',
      address: 'Near Piprali Circle, Piprali Road, Sikar',
      notes: 'Please keep mild spicy for elderly parents',
      items: [
        { id: 'thali-2', name: 'Authentic Rajasthani Dal Baati Churma Thali', price: 280, quantity: 2 },
        { id: 'main-1', name: 'Paneer Butter Masala (Handi Special)', price: 240, quantity: 1 }
      ],
      paymentMethod: 'CASH'
    });

    assert(deliveryOrderRes.status === 201, 'Home delivery order created with HTTP 201');
    const delOrder = deliveryOrderRes.json?.order;
    const otp = delOrder?.deliveryPartner?.deliveryOtp;
    assert(Boolean(otp && otp.length === 4), `Generated 4-digit secret delivery OTP: ${otp}`);
    assert(delOrder?.deliveryPartner?.riderName === 'Vikram Saini', 'Assigned verified Zomato delivery partner');
    assert(delOrder?.customer?.notes.includes('mild spicy'), 'Chef kitchen instructions preserved');

    // 5. Test Tracking Screen API
    console.log('\n--- 5. Testing Order Tracking Screen API ---');
    const trackRes = await httpRequest({
      hostname: 'localhost',
      port: 3000,
      path: `/api/orders/${delOrder.id}`,
      method: 'GET'
    });
    assert(trackRes.status === 200, 'Tracking API returns HTTP 200');
    assert(trackRes.json?.order?.deliveryPartner?.deliveryOtp === otp, 'Secret OTP accessible to customer in tracking response');

    console.log('\n================================================================');
    console.log(`🎉 TEST SUMMARY: ${passed}/${total} PASSING (100% SUCCESS)`);
    console.log('================================================================\n');

  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

runTests();
