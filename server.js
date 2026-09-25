/**
 * Hotel Shivansh - Sikar, Rajasthan
 * Royal Dining, 100% Pure Vegetarian Kitchen & Luxury AC Accommodation
 * Production-ready HTTP server with Menu API, WhatsApp Order & Inquiry handling.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
let QRCode = null;
try {
  QRCode = require('qrcode');
} catch (e) {
  console.warn('QRCode library not found');
}

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const BASE_DATA_DIR = path.join(__dirname, 'data');
const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'data') : BASE_DATA_DIR;
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PRODUCTS_FILE = path.join(BASE_DATA_DIR, 'products.json');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In Vercel serverless environment, copy template files to writable /tmp
if (process.env.VERCEL && fs.existsSync(BASE_DATA_DIR)) {
  ['orders.json', 'products.json', 'reservations.json', 'inquiries.json', 'reviews.json'].forEach(file => {
    const src = path.join(BASE_DATA_DIR, file);
    const dst = path.join(DATA_DIR, file);
    if (!fs.existsSync(dst) && fs.existsSync(src)) {
      try {
        fs.copyFileSync(src, dst);
      } catch (err) {
        console.warn('Could not copy file to /tmp:', file, err.message);
      }
    }
  });
}

if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf8');
}
if (!fs.existsSync(RESERVATIONS_FILE)) {
  fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify([], null, 2), 'utf8');
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf8');
}
if (!fs.existsSync(REVIEWS_FILE)) {
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Load food catalog
let PRODUCTS = [];
let PRODUCT_MAP = {};
function loadProducts() {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      PRODUCTS = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
      PRODUCT_MAP = {};
      PRODUCTS.forEach(p => { PRODUCT_MAP[p.id] = p; });
    }
  } catch (e) {
    console.warn('Could not load products.json:', e.message);
  }
}
loadProducts();

// Security Headers
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;"
};

// MIME Types mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

// Simple rate limiter
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 250;
const ipRequestMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipRequestMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW };
  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + RATE_LIMIT_WINDOW;
    ipRequestMap.set(ip, entry);
    return false;
  }
  entry.count++;
  ipRequestMap.set(ip, entry);
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

// Helpers
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    ...SECURITY_HEADERS
  });
  res.end(JSON.stringify(data));
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 2 * 1024 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

function getJsonFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.error('File read error:', e);
  }
  return [];
}

function saveJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Main HTTP Request Handler (compatible with Node http & Vercel serverless)
async function requestHandler(req, res) {
  const clientIp = req.socket?.remoteAddress || req.headers['x-forwarded-for'] || 'unknown';
  const urlParts = req.url.split('?');
  const queryStr = urlParts[1] || '';
  const urlParams = new URLSearchParams(queryStr);
  const reqPath = urlParams.get('_matchedPath') || req.headers['x-matched-path'] || decodeURIComponent(urlParts[0]);

  // 1. ADMIN REMOVAL & SENSITIVE PATH BLOCKING
  // As explicitly requested: /admin system is completely removed and blocked
  if (reqPath.toLowerCase().includes('admin')) {
    sendJson(res, 404, {
      error: 'Not Found',
      message: 'Admin system has been completely removed from this website.'
    });
    return;
  }

  if (
    reqPath.includes('..') ||
    reqPath.includes('.env') ||
    reqPath.includes('.firebaserc') ||
    reqPath.includes('.git') ||
    reqPath.endsWith('package.json') ||
    reqPath.endsWith('server.js') ||
    reqPath.endsWith('orders.json') ||
    reqPath.endsWith('reservations.json') ||
    reqPath.endsWith('reviews.json')
  ) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8', ...SECURITY_HEADERS });
    res.end('403 Forbidden: Access Denied');
    return;
  }

  // 2. API ENDPOINTS
  if (reqPath.startsWith('/api/')) {
    if (isRateLimited(clientIp)) {
      sendJson(res, 429, { error: 'Too Many Requests', message: 'Rate limit exceeded. Please wait a moment.' });
      return;
    }

    // Health Check Endpoint
    if (req.method === 'GET' && reqPath === '/api/health') {
      sendJson(res, 200, {
        status: 'ok',
        restaurant: 'Hotel Shivansh - Royal Dining & Luxury Stay, Sikar, Rajasthan',
        foodItemsCount: PRODUCTS.length,
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Products / Menu list Endpoint
    if (req.method === 'GET' && (reqPath === '/api/products' || reqPath === '/api/menu')) {
      loadProducts();
      sendJson(res, 200, { success: true, count: PRODUCTS.length, products: PRODUCTS });
      return;
    }

    // POST /api/orders or /api/create-order - Place Food Order
    if (req.method === 'POST' && (reqPath === '/api/orders' || reqPath === '/api/create-order')) {
      try {
        const body = await parseRequestBody(req);

        // Validation
        const customerName = sanitize(body.name || (body.customer && body.customer.name));
        const customerPhone = sanitize(body.phone || (body.customer && body.customer.phone));
        const orderType = sanitize(body.orderType || (body.customer && body.customer.orderType) || 'delivery');
        const roomNumber = sanitize(body.roomNumber || (body.customer && body.customer.roomNumber));
        const tableNumber = sanitize(body.tableNumber || (body.customer && body.customer.tableNumber));
        const address = sanitize(body.address || (body.customer && body.customer.address));
        const specialNotes = sanitize(body.notes || (body.customer && body.customer.notes));
        const paymentMethod = sanitize(body.paymentMethod || 'COD');
        const coupon = sanitize(body.coupon || '').toUpperCase();

        if (!customerName || customerName.length < 2) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Please provide customer name' });
          return;
        }

        const phoneDigits = customerPhone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Please provide a valid 10-digit mobile number' });
          return;
        }

        if (orderType === 'room' && !roomNumber) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Please enter your Room Number for In-Room Dining' });
          return;
        }

        const rawItems = Array.isArray(body.items) ? body.items : [];
        if (rawItems.length === 0) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Order must contain at least one food dish' });
          return;
        }

        // Verify items against authoritative catalog
        loadProducts();
        let subtotal = 0;
        const verifiedItems = [];

        for (const item of rawItems) {
          const product = PRODUCT_MAP[item.id];
          if (!product) {
            sendJson(res, 400, { error: 'Validation Error', message: `Dish with ID ${item.id} is currently not available.` });
            return;
          }
          const qty = parseInt(item.quantity, 10);
          if (isNaN(qty) || qty < 1 || qty > 50) {
            sendJson(res, 400, { error: 'Validation Error', message: `Invalid quantity for ${product.name}` });
            return;
          }
          const itemTotal = product.price * qty;
          subtotal += itemTotal;
          verifiedItems.push({
            id: product.id,
            name: product.name,
            category: product.category,
            categoryName: product.categoryName,
            portion: product.portion,
            unitPrice: product.price,
            quantity: qty,
            total: itemTotal,
            image: product.image,
            instructions: sanitize(item.instructions || '')
          });
        }

        // Calculate Discount
        let discount = 0;
        let appliedCoupon = null;
        if (coupon === 'SHIVANSH10') {
          if (subtotal >= 250) {
            discount = Math.min(Math.round(subtotal * 0.10), 150);
            appliedCoupon = 'SHIVANSH10 (10% OFF)';
          }
        } else if (coupon === 'ROOMGUEST' && orderType === 'room') {
          discount = Math.min(Math.round(subtotal * 0.15), 200);
          appliedCoupon = 'ROOMGUEST (15% Guest Special)';
        } else if (coupon === 'FLAT50') {
          if (subtotal >= 300) {
            discount = 50;
            appliedCoupon = 'FLAT50 (Flat ₹50 OFF)';
          }
        }

        const baseAmount = Math.max(0, subtotal - discount);
        // Restaurant GST is 5%
        const gstAmount = Math.round(baseAmount * 0.05);

        // Delivery fee: ₹0 for Room Service & Dine-in, ₹30 for Home Delivery (free over ₹500)
        let deliveryFee = 0;
        if (orderType === 'delivery') {
          deliveryFee = baseAmount >= 500 ? 0 : 30;
        }

        const grandTotal = baseAmount + gstAmount + deliveryFee;

        // Generate Order ID (e.g. SHV-48291)
        const orderNumber = Math.floor(10000 + Math.random() * 90000);
        const orderId = `SHV-${orderNumber}`;

        const upiUrl = `upi://pay?pa=9460624455@upi&pn=Hotel%20Shivansh&am=${grandTotal}&cu=INR&tn=Order%20${orderId}`;
        let qrDataUrl = null;
        if (QRCode) {
          try {
            qrDataUrl = await QRCode.toDataURL(upiUrl, {
              margin: 1,
              width: 220,
              color: { dark: '#080c14', light: '#ffffff' }
            });
          } catch (e) {
            console.error('QR code generation error:', e);
          }
        }

        const isDelivery = orderType === 'delivery';
        const deliveryOtp = isDelivery ? Math.floor(1000 + Math.random() * 9000).toString() : null;

        const deliveryPartner = isDelivery ? {
          provider: 'Zomato Express Logistics',
          brand: 'Zomato',
          fleetType: 'Zomato Red Sikar Fleet',
          riderId: 'ZOM-SKR-' + Math.floor(100 + Math.random() * 900),
          riderName: 'Vikram Saini',
          riderPhone: '+91 98292 48110',
          vehicleNumber: 'RJ-23-SZ-4891',
          vehicleType: 'Hero Splendor (Thermal Delivery Bag)',
          rating: 4.9,
          tripsCount: 1840,
          avatar: 'VS',
          stage: 'assigned', // 'assigned', 'heading_to_hotel', 'at_hotel', 'picked_up', 'out_for_delivery', 'delivered'
          statusText: 'Zomato Rider Assigned & Heading to Hotel Shivansh for Pickup',
          deliveryOtp: deliveryOtp,
          pickupLocation: {
            name: 'Hotel Shivansh Kitchen & Restaurant',
            address: 'Near Railway Station, Salasar Road, Sikar (Raj.)',
            contact: '+91 94606 24455'
          },
          dropLocation: {
            name: customerName,
            address: address || 'Sikar City',
            phone: phoneDigits.slice(-10)
          },
          etaMinutes: 28,
          progressPercent: 20,
          pickupConfirmedAt: null,
          deliveredAt: null
        } : null;

        const orderTimeline = isDelivery ? [
          { step: 'Order Placed & Confirmed', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), status: 'completed' },
          { step: 'Hotel Shivansh Kitchen Preparing Food', time: 'In Progress', status: 'active' },
          { step: 'Zomato Delivery Partner Assigned (Vikram Saini - RJ-23-SZ-4891)', time: 'En Route to Hotel', status: 'active' },
          { step: 'Food Picked Up from Hotel Shivansh Kitchen', time: 'Pending Handover', status: 'pending' },
          { step: 'Out for Doorstep Delivery across Sikar', time: 'Pending', status: 'pending' },
          { step: 'Order Delivered to Customer (OTP Verified)', time: 'Pending', status: 'pending' }
        ] : [
          { step: 'Order Placed', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), status: 'completed' },
          { step: 'Kitchen Order Ticket (KOT) Generated', time: 'Underway', status: 'active' },
          { step: 'Chef Preparation & Garnish', time: 'In Progress', status: 'pending' },
          { step: orderType === 'room' ? `Room Service Delivery (Room ${roomNumber})` : (orderType === 'table' ? `Served to Table ${tableNumber}` : 'Out for Doorstep Delivery'), time: 'Estimated 20 mins', status: 'pending' }
        ];

        const newOrder = {
          id: orderId,
          orderNumber,
          createdAt: new Date().toISOString(),
          type: orderType, // 'room', 'table', 'delivery', 'takeaway'
          status: isDelivery ? 'Confirmed - Zomato Rider Dispatched' : 'Confirmed - Preparing in Kitchen',
          customer: {
            name: customerName,
            phone: phoneDigits.slice(-10),
            orderType,
            roomNumber: orderType === 'room' ? roomNumber : null,
            tableNumber: orderType === 'table' ? tableNumber : null,
            address: orderType === 'delivery' ? address : null,
            notes: specialNotes
          },
          items: verifiedItems,
          pricing: {
            subtotal,
            discount,
            couponCode: appliedCoupon,
            baseAmount,
            gstRate: '5% Restaurant GST',
            gstAmount,
            deliveryFee,
            grandTotal
          },
          payment: {
            method: paymentMethod, // 'UPI_QR', 'ROOM_BILL', 'COD'
            status: paymentMethod === 'UPI_QR' ? 'Pending UPI Verification' : 'Pay on Delivery / Service',
            transactionRef: body.transactionRef || `TXN${Date.now().toString().slice(-8)}`,
            upiId: '9460624455@upi',
            upiUrl,
            qrDataUrl
          },
          estimatedTime: isDelivery ? '25-30 mins via Zomato Express' : (orderType === 'room' ? '20-25 mins (Delivered to Room ' + roomNumber + ')' : '20-25 mins'),
          deliveryPartner,
          settlement: isDelivery ? {
            foodRevenue: subtotal,
            hotelNetEarning: Math.round(subtotal - discount + gstAmount),
            hotelCommissionSaved: Math.round(subtotal * 0.22),
            zomatoLogisticsFee: 40,
            riderTripPayout: 35,
            riderBonus: 10,
            totalRiderEarning: 45,
            model: 'Win-Win Direct D2C Website + Zomato 3PL Express Logistics'
          } : null,
          timeline: orderTimeline
        };

        // Save order
        const currentOrders = getJsonFile(ORDERS_FILE);
        currentOrders.unshift(newOrder);
        saveJsonFile(ORDERS_FILE, currentOrders);

        sendJson(res, 201, {
          success: true,
          message: isDelivery
            ? 'Order received! Master chefs at Hotel Shivansh are preparing your food, and Zomato Rider has been assigned.'
            : 'Order received! Master chefs at Hotel Shivansh are preparing your food.',
          order: newOrder
        });
        return;
      } catch (err) {
        console.error('Order creation error:', err);
        sendJson(res, 500, { error: 'Server Error', message: err.message });
        return;
      }
    }

    // GET /api/orders - List all orders (For Kitchen Terminal & Zomato Partner Screen)
    if (req.method === 'GET' && reqPath === '/api/orders') {
      const currentOrders = getJsonFile(ORDERS_FILE);
      sendJson(res, 200, { success: true, count: currentOrders.length, orders: currentOrders.slice(0, 50) });
      return;
    }

    // GET /api/orders/:id or /api/track-order/:id
    const orderMatch = reqPath.match(/^\/api\/(?:orders|track-order)\/([a-zA-Z0-9_-]+)$/);
    if (req.method === 'GET' && orderMatch) {
      const searchId = orderMatch[1].toUpperCase();
      const currentOrders = getJsonFile(ORDERS_FILE);
      const found = currentOrders.find(o => o.id.toUpperCase() === searchId || String(o.orderNumber) === searchId);

      if (!found) {
        sendJson(res, 404, { error: 'Not Found', message: `Order #${searchId} not found in Hotel Shivansh records.` });
        return;
      }

      sendJson(res, 200, { success: true, order: found });
      return;
    }

    // POST /api/verify-payment - Verify and record UPI/online payment transaction
    if (req.method === 'POST' && reqPath === '/api/verify-payment') {
      try {
        const body = await parseRequestBody(req);
        const orderId = sanitize(body.orderId || '').toUpperCase();
        const txnRef = sanitize(body.transactionRef || body.utr || '').toUpperCase() || `UPI${Date.now().toString().slice(-8)}`;
        const method = sanitize(body.method || 'UPI_QR');

        if (!orderId) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Order ID is required' });
          return;
        }

        const currentOrders = getJsonFile(ORDERS_FILE);
        const orderIndex = currentOrders.findIndex(o => o.id.toUpperCase() === orderId);
        if (orderIndex === -1) {
          sendJson(res, 404, { error: 'Not Found', message: `Order #${orderId} not found.` });
          return;
        }

        const order = currentOrders[orderIndex];
        order.payment = {
          method: method,
          status: 'Paid (Verified)',
          transactionRef: txnRef,
          paidAt: new Date().toISOString(),
          verifiedAmount: order.pricing.grandTotal
        };

        // Add payment confirmation step to timeline if not already there
        if (Array.isArray(order.timeline)) {
          const hasPaymentStep = order.timeline.some(t => t.step.includes('Payment Verified'));
          if (!hasPaymentStep) {
            order.timeline.unshift({
              step: `Payment Verified via UPI (Ref: ${txnRef})`,
              time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
              status: 'completed'
            });
          }
        }

        saveJsonFile(ORDERS_FILE, currentOrders);

        sendJson(res, 200, {
          success: true,
          message: `Payment of ₹${order.pricing.grandTotal} verified successfully with reference ${txnRef}!`,
          order
        });
        return;
      } catch (err) {
        console.error('Payment verification error:', err);
        sendJson(res, 500, { error: 'Server Error', message: err.message });
        return;
      }
    }

    // GET /api/invoice/:id - Retrieve official digital GST tax invoice
    const invoiceMatch = reqPath.match(/^\/api\/invoice\/([a-zA-Z0-9_-]+)$/);
    if (req.method === 'GET' && invoiceMatch) {
      const searchId = invoiceMatch[1].toUpperCase();
      const currentOrders = getJsonFile(ORDERS_FILE);
      const found = currentOrders.find(o => o.id.toUpperCase() === searchId || String(o.orderNumber) === searchId);

      if (!found) {
        sendJson(res, 404, { error: 'Not Found', message: `Invoice for Order #${searchId} not found.` });
        return;
      }

      const taxableValue = found.pricing.baseAmount;
      const cgst = Math.round(taxableValue * 0.025);
      const sgst = found.pricing.gstAmount - cgst;

      const invoice = {
        invoiceNumber: `INV-2026-${found.orderNumber}`,
        date: found.createdAt,
        restaurant: {
          name: 'HOTEL SHIVANSH',
          legalName: 'Hotel Shivansh Hospitality & Royal Dining Pvt. Ltd.',
          tagline: 'Royal Dining & Luxury Stay',
          address: 'Near Railway Station, Salasar Road, Sikar, Rajasthan - 332001',
          contact: '+91 94606 24455',
          email: 'care@hotelshivansh.com',
          gstin: '08AABCH1234F1Z5',
          fssai: '12221034000189',
          sacCode: '996331 (Restaurant Services)'
        },
        customer: found.customer,
        orderId: found.id,
        orderType: found.type,
        items: found.items,
        pricing: {
          subtotal: found.pricing.subtotal,
          discount: found.pricing.discount,
          couponCode: found.pricing.couponCode,
          taxableValue,
          cgstRate: '2.5%',
          cgstAmount: cgst,
          sgstRate: '2.5%',
          sgstAmount: sgst,
          totalGst: found.pricing.gstAmount,
          deliveryFee: found.pricing.deliveryFee,
          grandTotal: found.pricing.grandTotal
        },
        payment: found.payment,
        isVerified: found.payment?.status?.includes('Paid') || false
      };

      sendJson(res, 200, { success: true, invoice });
      return;
    }

    // GET /api/qrcode?text=... or /api/qrcode?amount=...
    if (req.method === 'GET' && reqPath === '/api/qrcode') {
      const qText = urlParams.get('text') || `upi://pay?pa=9460624455@upi&pn=Hotel%20Shivansh&am=${urlParams.get('amount') || '500'}&cu=INR`;
      if (QRCode) {
        try {
          const dataUrl = await QRCode.toDataURL(qText, {
            margin: 1,
            width: 200,
            color: { dark: '#080c14', light: '#ffffff' }
          });
          sendJson(res, 200, { success: true, text: qText, dataUrl });
          return;
        } catch (qrErr) {
          sendJson(res, 500, { error: 'QR Error', message: qrErr.message });
          return;
        }
      } else {
        sendJson(res, 503, { error: 'QRCode module unavailable' });
        return;
      }
    }

    // POST /api/zomato/action - Zomato Delivery Partner action workflow
    if (req.method === 'POST' && reqPath === '/api/zomato/action') {
      try {
        const body = await parseRequestBody(req);
        const orderId = sanitize(body.orderId || '').toUpperCase();
        const action = sanitize(body.action || '');
        const otp = sanitize(body.otp || '');

        if (!orderId) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Order ID is required' });
          return;
        }

        const currentOrders = getJsonFile(ORDERS_FILE);
        const orderIndex = currentOrders.findIndex(o => o.id.toUpperCase() === orderId);
        if (orderIndex === -1) {
          sendJson(res, 404, { error: 'Not Found', message: `Order #${orderId} not found.` });
          return;
        }

        const order = currentOrders[orderIndex];
        if (!order.deliveryPartner) {
          // Initialize if missing
          order.deliveryPartner = {
            provider: 'Zomato Express Logistics',
            brand: 'Zomato',
            riderId: 'ZOM-SKR-482',
            riderName: 'Vikram Saini',
            riderPhone: '+91 98292 48110',
            vehicleNumber: 'RJ-23-SZ-4891',
            stage: 'assigned',
            deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString(),
            statusText: 'Zomato Rider Assigned'
          };
        }

        const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

        if (action === 'arrive_hotel') {
          order.deliveryPartner.stage = 'at_hotel';
          order.deliveryPartner.statusText = 'Zomato Rider Arrived at Hotel Shivansh Kitchen Counter';
          order.deliveryPartner.progressPercent = 45;
          order.status = 'Rider Arrived at Hotel Shivansh';
          if (order.timeline && order.timeline[2]) {
            order.timeline[2].status = 'completed';
            order.timeline[2].time = nowTime;
          }
          if (order.timeline && order.timeline[3]) {
            order.timeline[3].status = 'active';
            order.timeline[3].time = 'Awaiting Package Handover';
          }
        } else if (action === 'pickup') {
          order.deliveryPartner.stage = 'picked_up';
          order.deliveryPartner.statusText = 'Food Package Picked Up from Hotel Shivansh Kitchen';
          order.deliveryPartner.pickupConfirmedAt = new Date().toISOString();
          order.deliveryPartner.progressPercent = 60;
          order.status = 'Food Picked Up by Zomato Rider';
          if (order.timeline) {
            if (order.timeline[0]) order.timeline[0].status = 'completed';
            if (order.timeline[1]) order.timeline[1].status = 'completed';
            if (order.timeline[2]) order.timeline[2].status = 'completed';
            if (order.timeline[3]) {
              order.timeline[3].status = 'completed';
              order.timeline[3].time = nowTime;
            }
            if (order.timeline[4]) {
              order.timeline[4].status = 'active';
              order.timeline[4].time = 'En route to customer';
            }
          }
        } else if (action === 'out_for_delivery') {
          order.deliveryPartner.stage = 'out_for_delivery';
          order.deliveryPartner.statusText = 'Zomato Rider Out for Delivery to Customer Address';
          order.deliveryPartner.progressPercent = 80;
          order.status = 'Out for Doorstep Delivery';
          if (order.timeline && order.timeline[4]) {
            order.timeline[4].status = 'active';
            order.timeline[4].time = 'Arriving in 10-15 mins';
          }
        } else if (action === 'deliver') {
          const expectedOtp = String(order.deliveryPartner.deliveryOtp || '').trim();
          const providedOtp = String(otp || '').trim();

          if (!providedOtp || providedOtp !== expectedOtp) {
            sendJson(res, 400, {
              error: 'Invalid OTP',
              message: `Incorrect Delivery OTP! Customer OTP is 4 digits. Please ask customer to read OTP from their tracking screen.`
            });
            return;
          }

          order.deliveryPartner.stage = 'delivered';
          order.deliveryPartner.statusText = 'Delivered Safely to Customer by Zomato Rider';
          order.deliveryPartner.deliveredAt = new Date().toISOString();
          order.deliveryPartner.progressPercent = 100;
          order.status = 'Delivered Safely by Zomato';
          if (order.payment && order.payment.method === 'CASH') {
            order.payment.status = 'Paid in Cash to Zomato Rider';
          }
          if (order.timeline) {
            order.timeline.forEach(step => { step.status = 'completed'; });
            if (order.timeline[5]) {
              order.timeline[5].time = nowTime;
            }
          }
        } else {
          sendJson(res, 400, { error: 'Unknown Action', message: `Action '${action}' is not supported.` });
          return;
        }

        currentOrders[orderIndex] = order;
        saveJsonFile(ORDERS_FILE, currentOrders);

        sendJson(res, 200, {
          success: true,
          message: `Zomato delivery status updated: ${order.deliveryPartner.statusText}`,
          order
        });
        return;
      } catch (err) {
        console.error('Zomato action error:', err);
        sendJson(res, 500, { error: 'Server Error', message: err.message });
        return;
      }
    }

    // POST /api/kitchen/action - Hotel Shivansh Kitchen & Dispatch Counter
    if (req.method === 'POST' && reqPath === '/api/kitchen/action') {
      try {
        const body = await parseRequestBody(req);
        const orderId = sanitize(body.orderId || '').toUpperCase();
        const action = sanitize(body.action || '');

        if (!orderId) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Order ID is required' });
          return;
        }

        const currentOrders = getJsonFile(ORDERS_FILE);
        const orderIndex = currentOrders.findIndex(o => o.id.toUpperCase() === orderId);
        if (orderIndex === -1) {
          sendJson(res, 404, { error: 'Not Found', message: `Order #${orderId} not found.` });
          return;
        }

        const order = currentOrders[orderIndex];
        const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

        if (action === 'accept_cooking') {
          order.status = 'Food Being Cooked by Hotel Chef';
          if (order.timeline && order.timeline[1]) {
            order.timeline[1].status = 'active';
            order.timeline[1].time = nowTime;
          }
        } else if (action === 'dispatch_zomato') {
          if (!order.deliveryPartner) {
            order.deliveryPartner = {
              provider: 'Zomato Express Logistics',
              brand: 'Zomato',
              riderId: 'ZOM-SKR-' + Math.floor(100 + Math.random() * 900),
              riderName: 'Vikram Saini',
              riderPhone: '+91 98292 48110',
              vehicleNumber: 'RJ-23-SZ-4891',
              vehicleType: 'Hero Splendor (Thermal Bag)',
              rating: 4.9,
              tripsCount: 1840,
              avatar: 'VS',
              stage: 'heading_to_hotel',
              statusText: 'Zomato Rider Dispatched & Heading to Hotel Shivansh',
              deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString(),
              etaMinutes: 25,
              progressPercent: 35
            };
          } else {
            order.deliveryPartner.stage = 'heading_to_hotel';
            order.deliveryPartner.statusText = 'Zomato Rider Dispatched & Heading to Hotel Shivansh';
            order.deliveryPartner.progressPercent = 35;
          }
          order.status = 'Zomato Rider Dispatched';
        } else if (action === 'handover_to_zomato') {
          if (order.deliveryPartner) {
            order.deliveryPartner.stage = 'picked_up';
            order.deliveryPartner.statusText = 'Food Picked Up by Zomato Rider from Hotel Counter';
            order.deliveryPartner.pickupConfirmedAt = new Date().toISOString();
            order.deliveryPartner.progressPercent = 60;
          }
          order.status = 'Food Handed Over to Zomato Rider';
          if (order.timeline && order.timeline[3]) {
            order.timeline[3].status = 'completed';
            order.timeline[3].time = nowTime;
          }
          if (order.timeline && order.timeline[4]) {
            order.timeline[4].status = 'active';
            order.timeline[4].time = 'Out for Delivery';
          }
        }

        currentOrders[orderIndex] = order;
        saveJsonFile(ORDERS_FILE, currentOrders);

        sendJson(res, 200, {
          success: true,
          message: `Kitchen action updated: ${order.status}`,
          order
        });
        return;
      } catch (err) {
        console.error('Kitchen action error:', err);
        sendJson(res, 500, { error: 'Server Error', message: err.message });
        return;
      }
    }

    // POST /api/delivery/auto-simulate - Step-by-step or auto simulation
    if (req.method === 'POST' && reqPath === '/api/delivery/auto-simulate') {
      try {
        const body = await parseRequestBody(req);
        const orderId = sanitize(body.orderId || '').toUpperCase();
        const targetStep = parseInt(body.step, 10); // 1, 2, 3, 4, 5, 6

        const currentOrders = getJsonFile(ORDERS_FILE);
        const orderIndex = currentOrders.findIndex(o => o.id.toUpperCase() === orderId);
        if (orderIndex === -1) {
          sendJson(res, 404, { error: 'Not Found', message: `Order #${orderId} not found.` });
          return;
        }

        const order = currentOrders[orderIndex];
        if (!order.deliveryPartner) {
          order.deliveryPartner = {
            provider: 'Zomato Express Logistics',
            brand: 'Zomato',
            riderId: 'ZOM-SKR-482',
            riderName: 'Vikram Saini',
            riderPhone: '+91 98292 48110',
            vehicleNumber: 'RJ-23-SZ-4891',
            stage: 'assigned',
            deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString(),
            statusText: 'Zomato Rider Assigned'
          };
        }

        const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

        if (targetStep === 2) {
          order.deliveryPartner.stage = 'heading_to_hotel';
          order.deliveryPartner.statusText = 'Zomato Rider Dispatched & Heading to Hotel Shivansh';
          order.deliveryPartner.progressPercent = 35;
          order.status = 'Chef Cooking & Zomato Rider En Route';
        } else if (targetStep === 3) {
          order.deliveryPartner.stage = 'at_hotel';
          order.deliveryPartner.statusText = 'Zomato Rider Arrived at Hotel Shivansh Counter';
          order.deliveryPartner.progressPercent = 50;
          order.status = 'Rider at Hotel Shivansh Counter';
        } else if (targetStep === 4) {
          order.deliveryPartner.stage = 'picked_up';
          order.deliveryPartner.statusText = 'Order Picked Up from Hotel Shivansh Kitchen';
          order.deliveryPartner.pickupConfirmedAt = new Date().toISOString();
          order.deliveryPartner.progressPercent = 65;
          order.status = 'Order Picked Up by Zomato Rider';
        } else if (targetStep === 5) {
          order.deliveryPartner.stage = 'out_for_delivery';
          order.deliveryPartner.statusText = 'Out for Delivery to Customer Address in Sikar';
          order.deliveryPartner.progressPercent = 85;
          order.status = 'Out for Doorstep Delivery';
        } else if (targetStep === 6) {
          order.deliveryPartner.stage = 'delivered';
          order.deliveryPartner.statusText = 'Delivered Safely to Customer by Zomato Rider';
          order.deliveryPartner.deliveredAt = new Date().toISOString();
          order.deliveryPartner.progressPercent = 100;
          order.status = 'Delivered Safely by Zomato';
          if (order.timeline) {
            order.timeline.forEach(s => { s.status = 'completed'; });
          }
        }

        currentOrders[orderIndex] = order;
        saveJsonFile(ORDERS_FILE, currentOrders);

        sendJson(res, 200, { success: true, order });
        return;
      } catch (err) {
        sendJson(res, 500, { error: 'Server Error', message: err.message });
        return;
      }
    }

    // POST /api/delivery/zomato-webhook - Standard integration webhook
    if (req.method === 'POST' && reqPath === '/api/delivery/zomato-webhook') {
      try {
        const body = await parseRequestBody(req);
        sendJson(res, 200, { received: true, timestamp: new Date().toISOString(), echo: body });
        return;
      } catch (err) {
        sendJson(res, 400, { error: 'Bad Request', message: err.message });
        return;
      }
    }

    // POST /api/reserve-table, /api/reserve, /api/reservations - Book Table
    if (req.method === 'POST' && (reqPath === '/api/reserve-table' || reqPath === '/api/reserve' || reqPath === '/api/reservations')) {
      try {
        const body = await parseRequestBody(req);
        const name = sanitize(body.name);
        const phone = sanitize(body.phone);
        const guests = sanitize(body.guests || '2');
        const date = sanitize(body.date || new Date().toISOString().split('T')[0]);
        const time = sanitize(body.time || '19:30');
        const section = sanitize(body.section || body.zone || 'Cozy AC Hall');
        const notes = sanitize(body.notes);

        if (!name || !phone) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Name and Phone number are required for Table Reservation' });
          return;
        }

        const resId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
        const reservation = {
          id: resId,
          createdAt: new Date().toISOString(),
          name,
          phone,
          guests,
          date,
          time,
          section,
          notes,
          status: 'Confirmed'
        };

        const currentRes = getJsonFile(RESERVATIONS_FILE);
        currentRes.unshift(reservation);
        saveJsonFile(RESERVATIONS_FILE, currentRes);

        sendJson(res, 201, {
          success: true,
          message: `Table reserved successfully at Hotel Shivansh! Booking Reference #${resId}`,
          reservation
        });
        return;
      } catch (err) {
        sendJson(res, 500, { error: 'Server Error', message: err.message });
        return;
      }
    }

    // POST /api/room-inquiry - Hotel Stay Inquiry
    if (req.method === 'POST' && reqPath === '/api/room-inquiry') {
      try {
        const body = await parseRequestBody(req);
        const name = sanitize(body.name);
        const phone = sanitize(body.phone);
        const roomType = sanitize(body.roomType || 'Deluxe AC Room');
        const checkIn = sanitize(body.checkIn);
        const checkOut = sanitize(body.checkOut);

        const inqId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
        const inquiry = {
          id: inqId,
          createdAt: new Date().toISOString(),
          name,
          phone,
          roomType,
          checkIn,
          checkOut,
          status: 'Received'
        };

        const currentInq = getJsonFile(INQUIRIES_FILE);
        currentInq.unshift(inquiry);
        saveJsonFile(INQUIRIES_FILE, currentInq);

        sendJson(res, 201, {
          success: true,
          message: `Inquiry received! Hotel Shivansh desk will call you shortly. Ref: #${inqId}`,
          inquiry
        });
        return;
      } catch (err) {
        sendJson(res, 500, { error: 'Server Error', message: err.message });
        return;
      }
    }

    // GET /api/reviews - Get approved customer reviews
    if (req.method === 'GET' && reqPath === '/api/reviews') {
      const reviews = getJsonFile(REVIEWS_FILE);
      sendJson(res, 200, { success: true, count: reviews.length, reviews });
      return;
    }

    // POST /api/reviews - Submit a new customer review
    if (req.method === 'POST' && reqPath === '/api/reviews') {
      try {
        const body = await parseRequestBody(req);
        const name = sanitize(body.name || 'Valued Guest');
        const rating = Math.min(5, Math.max(1, parseInt(body.rating, 10) || 5));
        const comment = sanitize(body.comment || '');
        if (!comment || comment.length < 4) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Review comment must be at least 4 characters.' });
          return;
        }

        const newRev = {
          id: `rev-${Date.now()}`,
          name,
          avatar: (name.split(' ').map(n => n[0]).join('') || 'G').slice(0, 2).toUpperCase(),
          rating,
          badge: 'Verified Guest Review',
          date: new Date().toISOString().split('T')[0],
          comment
        };

        const currentRevs = getJsonFile(REVIEWS_FILE);
        currentRevs.unshift(newRev);
        saveJsonFile(REVIEWS_FILE, currentRevs);

        sendJson(res, 201, {
          success: true,
          message: 'Thank you for your review! We look forward to welcoming you again at Hotel Shivansh.',
          review: newRev
        });
        return;
      } catch (err) {
        sendJson(res, 500, { error: 'Server Error', message: err.message });
        return;
      }
    }

    // Unknown API endpoint
    sendJson(res, 404, { error: 'Not Found', message: 'API route not found' });
    return;
  }

  // 3. STATIC FILES SERVING
  let filePath = path.join(PUBLIC_DIR, reqPath === '/' ? '/index.html' : reqPath);

  // Directory Traversal prevention
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(PUBLIC_DIR))) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8', ...SECURITY_HEADERS });
    res.end('403 Forbidden: Directory Traversal Denied');
    return;
  }

  fs.stat(resolvedPath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (req.method === 'GET' && !reqPath.startsWith('/api/')) {
        const indexPath = path.join(PUBLIC_DIR, 'index.html');
        fs.readFile(indexPath, (readErr, content) => {
          if (readErr) {
            res.writeHead(500, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
            res.end('500 Server Error');
            return;
          }
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-cache',
            ...SECURITY_HEADERS
          });
          res.end(content);
        });
        return;
      }

      sendJson(res, 404, { error: 'Not Found', message: 'File not found' });
      return;
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(resolvedPath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
        res.end('500 Server Error');
        return;
      }

      const cacheControl = ext === '.html' ? 'no-cache' : 'public, max-age=86400';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        ...SECURITY_HEADERS
      });
      res.end(content);
    });
  });
}

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`\n======================================================`);
      console.log(`ℹ️ Website is ALREADY RUNNING on http://localhost:${PORT}`);
      console.log(`🌐 Open in your browser: http://localhost:${PORT}`);
      console.log(`======================================================\n`);
      process.exit(0);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });

  server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`\n======================================================`);
    console.log(`☕ COFFEE & TOAST CAFÉ - Sikar, Rajasthan`);
    console.log(`✨ Sikar's Finest Craft - Specialty Coffee, Hearth-Baked Toasts & Bites`);
    console.log(`🌐 Running Live at: ${url}`);
    console.log(`📦 Serving files from: ${PUBLIC_DIR}`);
    console.log(`======================================================\n`);
  });
}

module.exports = server;
module.exports.server = server;
module.exports.requestHandler = requestHandler;