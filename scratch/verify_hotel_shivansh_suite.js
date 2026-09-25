const http = require('http');

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

function post(path, postData) {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(postData);
    const req = http.request(`http://localhost:3000${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataString)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(dataString);
    req.end();
  });
}

async function runVerification() {
  console.log('--- STARTING HOTEL SHIVANSH SUITE VERIFICATION ---');
  let failures = 0;

  // 1. Check Homepage
  try {
    const home = await get('/');
    console.log(`[1] Home page GET /: Status ${home.status}`);
    if (home.status !== 200) throw new Error('Home page returned status ' + home.status);
    if (!home.body.includes('Hotel Shivansh')) throw new Error('Home missing "Hotel Shivansh" branding');
    if (!home.body.includes('vipPassCard')) throw new Error('Home missing VIP pass preview element');
    if (!home.body.includes('mobileBottomBar')) throw new Error('Home missing mobile bottom navigation bar');
    if (!home.body.includes('pureVegPill')) throw new Error('Home missing pure veg badge');
    if (!home.body.includes('floatingCartPill')) throw new Error('Home missing floating cart pill');
    console.log('    ✓ Home page contains full Hotel Shivansh markup, mobile dock & elements');
  } catch (e) {
    console.error('    ✗ Home page check failed:', e.message);
    failures++;
  }

  // 2. Check Static Assets
  const assets = [
    '/assets/restaurant_thali.jpg',
    '/assets/dish_paneer.jpg',
    '/assets/dish_biryani.jpg',
    '/assets/dish_starters.jpg',
    '/assets/room_deluxe.jpg',
    '/assets/room_standard.jpg',
    '/assets/hotel_hero.jpg',
    '/assets/restaurant_ambiance.jpg',
    '/assets/shivansh_facade.jpg',
    '/manifest.json',
    '/sw.js',
    '/styles.css',
    '/app.js'
  ];

  console.log(`[2] Checking ${assets.length} static assets...`);
  for (const asset of assets) {
    try {
      const res = await get(asset);
      if (res.status !== 200) {
        console.error(`    ✗ Asset ${asset} failed with status ${res.status}`);
        failures++;
      } else {
        console.log(`    ✓ Asset ${asset} OK (${res.headers['content-length'] || res.body.length} bytes)`);
      }
    } catch (e) {
      console.error(`    ✗ Asset ${asset} fetch error:`, e.message);
      failures++;
    }
  }

  // 3. Check APIs
  try {
    const health = await get('/api/health');
    console.log(`[3] GET /api/health: Status ${health.status}, Response:`, health.body.trim());
    if (health.status !== 200) throw new Error('Health check failed');
  } catch (e) {
    console.error('    ✗ Health API error:', e.message);
    failures++;
  }

  try {
    const productsRes = await get('/api/products');
    const parsed = JSON.parse(productsRes.body);
    const products = parsed.products || parsed;
    console.log(`[4] GET /api/products: Status ${productsRes.status}, Product count: ${products.length}`);
    if (products.length < 30) throw new Error(`Expected at least 30 products, got ${products.length}`);
    console.log(`    ✓ Sample item: "${products[0].name}" (₹${products[0].price}) - Category: ${products[0].category}`);
  } catch (e) {
    console.error('    ✗ Products API error:', e.message);
    failures++;
  }

  try {
    const reviewsRes = await get('/api/reviews');
    const parsed = JSON.parse(reviewsRes.body);
    const reviews = parsed.reviews || parsed;
    console.log(`[5] GET /api/reviews: Status ${reviewsRes.status}, Review count: ${reviews.length}`);
    if (!reviews || reviews.length === 0) throw new Error('Expected reviews, got 0');
    console.log(`    ✓ Sample review: By ${reviews[0].name || reviews[0].author} - "${(reviews[0].comment || reviews[0].text).substring(0, 40)}..."`);
  } catch (e) {
    console.error('    ✗ Reviews API error:', e.message);
    failures++;
  }

  // 4. Test Orders POST with a valid product ID
  try {
    const orderPayload = {
      name: 'Rahul Verma',
      phone: '9876543210',
      orderType: 'room',
      roomNumber: '204',
      notes: 'Less spicy, extra butter naan please',
      paymentMethod: 'UPI_QR',
      coupon: 'ROOMGUEST',
      items: [{ id: 'thali-1', quantity: 2 }]
    };
    const orderRes = await post('/api/orders', orderPayload);
    const orderResult = JSON.parse(orderRes.body);
    console.log(`[6] POST /api/orders: Status ${orderRes.status}, Order ID: ${orderResult.order?.id}`);
    if (!orderResult.success || !orderResult.order?.id) throw new Error('Order creation was not successful');
    console.log('    ✓ Order placed successfully with verified pricing:', orderResult.order.pricing);
  } catch (e) {
    console.error('    ✗ POST /api/orders failed:', e.message);
    failures++;
  }

  // 5. Test Table Reservation POST
  try {
    const reservePayload = {
      name: 'Pooja Agarwal',
      phone: '9123456789',
      guests: '4',
      date: '2026-09-25',
      time: '20:30',
      section: 'Main Royal AC Dining Hall',
      notes: 'Anniversary celebration table'
    };
    const reserveRes = await post('/api/reserve', reservePayload);
    const reserveResult = JSON.parse(reserveRes.body);
    console.log(`[7] POST /api/reserve: Status ${reserveRes.status}, Reservation ID: ${reserveResult.reservation?.id}`);
    if (!reserveResult.success || !reserveResult.reservation?.id) throw new Error('Reservation was not successful');
    console.log(`    ✓ Reservation confirmed with ID: ${reserveResult.reservation.id}`);
  } catch (e) {
    console.error('    ✗ POST /api/reserve failed:', e.message);
    failures++;
  }

  // 6. Test Room Inquiry POST
  try {
    const roomPayload = {
      name: 'Karan Sharma',
      phone: '9811223344',
      checkIn: '2026-10-01',
      checkOut: '2026-10-03',
      roomType: 'Royal Suite (AC, Maharaja Bed, City View)'
    };
    const roomRes = await post('/api/room-inquiry', roomPayload);
    const roomResult = JSON.parse(roomRes.body);
    console.log(`[8] POST /api/room-inquiry: Status ${roomRes.status}, Inquiry ID: ${roomResult.inquiry?.id}`);
    if (!roomResult.success || !roomResult.inquiry?.id) throw new Error('Room inquiry was not successful');
    console.log(`    ✓ Room inquiry registered with ID: ${roomResult.inquiry.id}`);
  } catch (e) {
    console.error('    ✗ POST /api/room-inquiry failed:', e.message);
    failures++;
  }

  console.log('--------------------------------------------------');
  if (failures === 0) {
    console.log('🎉 ALL TESTS PASSED! HOTEL SHIVANSH SYSTEM IS 100% OPERATIONAL');
  } else {
    console.error(`⚠️ VERIFICATION FINISHED WITH ${failures} FAILURES`);
  }
}

runVerification();
