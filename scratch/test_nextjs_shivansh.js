const http = require('http');

function request(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body,
        });
      });
    });

    req.on('error', (err) => reject(err));

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Testing Hotel Shivansh Next.js App on port 3000 ---');

  // Test 1: Home Page HTML & Dark Mode
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
    });
    const hasHotelShivansh = res.body.includes('HOTEL SHIVANSH') || res.body.includes('Hotel Shivansh');
    const hasDarkMode = res.body.includes('dark');
    console.log(`1. Home Page HTML: Status ${res.statusCode} | Has Hotel Shivansh: ${hasHotelShivansh} | Has Dark Mode: ${hasDarkMode}`);
  } catch (err) {
    console.error('1. Home Page Test Failed:', err.message);
  }

  // Test 2: Products API
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/products',
      method: 'GET',
    });
    const data = JSON.parse(res.body);
    console.log(`2. Products API: Status ${res.statusCode} | Dish Count: ${Array.isArray(data) ? data.length : 0}`);
    if (Array.isArray(data) && data[0]) {
      console.log(`   Sample Dish: ${data[0].name} (₹${data[0].price})`);
    }
  } catch (err) {
    console.error('2. Products API Failed:', err.message);
  }

  // Test 3: Create Order API
  try {
    const orderPayload = {
      type: 'room',
      customer: { name: 'Rehan Test', phone: '9460624455', orderType: 'room', roomNumber: '204' },
      items: [{ id: 'thali-1', quantity: 1, unitPrice: 320, total: 320 }],
      pricing: { subtotal: 320, discount: 0, grandTotal: 336 },
      payment: { method: 'UPI_QR' },
    };
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/order',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, orderPayload);
    const data = JSON.parse(res.body);
    console.log(`3. Order API: Status ${res.statusCode} | Order ID: ${data.id} | Status: ${data.status}`);
  } catch (err) {
    console.error('3. Order API Failed:', err.message);
  }

  // Test 4: Reserve Table API
  try {
    const reservePayload = {
      name: 'Ramesh Sharma',
      phone: '9876543210',
      guests: '4 Guests',
      date: '2026-09-08',
      time: '8:00 PM',
      section: 'AC Royal Family Hall',
    };
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/reserve',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, reservePayload);
    const data = JSON.parse(res.body);
    console.log(`4. Table Reservation API: Status ${res.statusCode} | Ref: ${data.id} | Status: ${data.status}`);
  } catch (err) {
    console.error('4. Reservation API Failed:', err.message);
  }

  // Test 5: /admin strictly returns 404
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/admin',
      method: 'GET',
    });
    console.log(`5. Admin Route Block: Status ${res.statusCode} (Expected 404: ${res.statusCode === 404})`);
  } catch (err) {
    console.error('5. Admin Route Test Failed:', err.message);
  }

  console.log('--- All Next.js tests completed ---');
}

runTests();
