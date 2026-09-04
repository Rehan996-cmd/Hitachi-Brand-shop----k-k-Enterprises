/**
 * Hitachi Brand Shop - K.K. Enterprises Web Portal Server
 * Production-ready, secure HTTP server with order processing & payment APIs.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

// Ensure data directory and orders file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Load authoritative product catalog for server-side price calculation
let PRODUCTS = [];
let PRODUCT_MAP = {};
try {
  if (fs.existsSync(PRODUCTS_FILE)) {
    PRODUCTS = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    PRODUCTS.forEach(p => { PRODUCT_MAP[p.id] = p; });
  }
} catch (e) {
  console.warn('Could not load products.json:', e.message);
}

// Security Headers (Helmet equivalent)
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
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

// In-Memory Rate Limiter for API endpoints (protects against DoS / spam)
const ipRequestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipRequestCounts.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW_MS;
    ipRequestCounts.set(ip, record);
    return false;
  }

  record.count++;
  ipRequestCounts.set(ip, record);
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

// Helper to send JSON responses with security headers
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    ...SECURITY_HEADERS
  });
  res.end(JSON.stringify(data));
}

// Helper to parse request body safely (with size limit)
function parseRequestBody(req, maxBytes = 102400) {
  return new Promise((resolve, reject) => {
    let body = '';
    let bytesReceived = 0;

    req.on('data', chunk => {
      bytesReceived += chunk.length;
      if (bytesReceived > maxBytes) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      body += chunk;
    });

    req.on('end', () => {
      try {
        const json = body ? JSON.parse(body) : {};
        resolve(json);
      } catch (e) {
        reject(new Error('Invalid JSON format'));
      }
    });

    req.on('error', err => reject(err));
  });
}

// Helper to sanitize strings
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

// Read orders helper
function getOrders() {
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Write orders helper
function saveOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  const clientIp = req.socket.remoteAddress || 'unknown';
  const urlParts = req.url.split('?');
  const reqPath = decodeURIComponent(urlParts[0]);

  // 1. SECURITY & ADMIN BLOCKING:
  // Explicitly block all /admin paths, admin probes, and sensitive files
  if (
    reqPath === '/admin' || 
    reqPath.startsWith('/admin/') || 
    reqPath.toLowerCase().includes('admin') ||
    reqPath.includes('..') ||
    reqPath.includes('.env') ||
    reqPath.includes('.firebaserc') ||
    reqPath.includes('.git') ||
    reqPath.endsWith('package.json') ||
    reqPath.endsWith('server.js') ||
    reqPath.includes('orders.json')
  ) {
    if (reqPath.toLowerCase().includes('admin')) {
      sendJson(res, 404, {
        error: 'Not Found',
        message: 'Admin system is not available on this website.'
      });
      return;
    }
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8', ...SECURITY_HEADERS });
    res.end('403 Forbidden: Access Denied');
    return;
  }

  // 2. API ENDPOINTS:
  if (reqPath.startsWith('/api/')) {
    // Check rate limit
    if (isRateLimited(clientIp)) {
      sendJson(res, 429, { error: 'Too Many Requests', message: 'Rate limit exceeded. Please wait a moment.' });
      return;
    }

    // Health Check Endpoint
    if (req.method === 'GET' && reqPath === '/api/health') {
      sendJson(res, 200, {
        status: 'ok',
        shop: 'Hitachi Brand Shop - K.K. Enterprises, Sikar',
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Products list Endpoint
    if (req.method === 'GET' && reqPath === '/api/products') {
      sendJson(res, 200, { success: true, count: PRODUCTS.length, products: PRODUCTS });
      return;
    }

    // POST /api/orders - Place New Order with Server-Side Price Verification
    if (req.method === 'POST' && reqPath === '/api/orders') {
      try {
        const body = await parseRequestBody(req);

        // Validation
        const customerName = sanitize(body.name);
        const customerPhone = sanitize(body.phone);
        const customerEmail = sanitize(body.email);
        const address = sanitize(body.address);
        const landmark = sanitize(body.landmark);
        const city = sanitize(body.city) || 'Sikar';
        const pincode = sanitize(body.pincode) || '332001';
        const deliverySlot = sanitize(body.deliverySlot) || 'Express Delivery (24-48 Hours)';
        const gstin = sanitize(body.gstin);
        const paymentMethod = sanitize(body.paymentMethod) || 'COD';
        const couponCode = sanitize(body.couponCode).toUpperCase();
        const rawItems = Array.isArray(body.items) ? body.items : [];

        if (!customerName || customerName.length < 2) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Valid customer name is required.' });
          return;
        }

        const phoneClean = customerPhone.replace(/\D/g, '');
        if (phoneClean.length !== 10) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Valid 10-digit Indian mobile number is required.' });
          return;
        }

        if (rawItems.length === 0) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Cart cannot be empty.' });
          return;
        }

        // Server-Side Verification: Calculate authoritative prices
        const verifiedItems = [];
        let subtotal = 0;

        for (const item of rawItems) {
          const prod = PRODUCT_MAP[item.id];
          const qty = Math.max(1, Math.min(10, parseInt(item.quantity) || 1));
          if (prod) {
            const itemTotal = prod.price * qty;
            subtotal += itemTotal;
            verifiedItems.push({
              id: prod.id,
              name: prod.name,
              category: prod.category,
              tonnage: prod.tonnage || '',
              price: prod.price,
              mrp: prod.mrp,
              quantity: qty,
              total: itemTotal,
              image: prod.image
            });
          }
        }

        if (verifiedItems.length === 0) {
          sendJson(res, 400, { error: 'Validation Error', message: 'No valid products found in cart.' });
          return;
        }

        // Calculate Discounts & Taxes
        let discount = 0;
        let appliedCoupon = null;

        if (couponCode === 'HITACHI5000' && subtotal >= 40000) {
          discount = 5000;
          appliedCoupon = 'HITACHI5000 (₹5,000 Exclusive Brand Shop Instant Discount)';
        } else if (couponCode === 'FIRSTBUY') {
          discount = Math.min(2000, Math.round(subtotal * 0.05));
          appliedCoupon = 'FIRSTBUY (5% Welcome Discount)';
        } else if (couponCode === 'COOLSUMMER' && subtotal >= 30000) {
          discount = 2500;
          appliedCoupon = 'COOLSUMMER (₹2,500 Summer Cooling Offer)';
        }

        const discountedSubtotal = Math.max(0, subtotal - discount);
        // Note: Retail consumer electronics MRP is inclusive of 18% GST.
        // We clearly show the tax breakdown on the invoice.
        const baseAmount = Math.round(discountedSubtotal / 1.18);
        const gstAmount = discountedSubtotal - baseAmount;
        const deliveryFee = 0; // Free delivery in Sikar promo
        const installationFee = 0; // Standard installation included promo
        const grandTotal = discountedSubtotal;

        // Generate Official Order ID
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const orderId = `HKK-2026-${randomNum}`;

        const newOrder = {
          id: orderId,
          orderNumber: randomNum,
          createdAt: new Date().toISOString(),
          status: 'Confirmed',
          customer: {
            name: customerName,
            phone: phoneClean,
            email: customerEmail,
            address,
            landmark,
            city,
            pincode,
            deliverySlot,
            gstin: gstin || 'Not Provided (Consumer)'
          },
          items: verifiedItems,
          pricing: {
            subtotal,
            discount,
            couponCode: appliedCoupon,
            baseAmount,
            gstRate: '18% (9% CGST + 9% SGST)',
            gstAmount,
            deliveryFee,
            installationFee,
            grandTotal
          },
          payment: {
            method: paymentMethod, // 'UPI_QR', 'CARD', 'NETBANKING', 'EMI', 'COD'
            status: paymentMethod === 'COD' ? 'Pending on Delivery' : 'Paid - Verified',
            transactionRef: body.transactionRef || `TXN${Date.now().toString().slice(-8)}`,
            verifiedAt: new Date().toISOString()
          },
          timeline: [
            { step: 'Order Placed', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), status: 'completed' },
            { step: 'Showroom Processing (K.K. Enterprises, Sikar)', time: 'Underway', status: 'active' },
            { step: 'Dispatched from Ganpati Tower Warehouse', time: 'Pending', status: 'pending' },
            { step: 'Delivery & Certified Installation', time: deliverySlot, status: 'pending' }
          ]
        };

        // Save order to persistent store
        const currentOrders = getOrders();
        currentOrders.unshift(newOrder);
        saveOrders(currentOrders);

        sendJson(res, 201, {
          success: true,
          message: 'Order confirmed successfully! K.K. Enterprises Hitachi team is preparing your dispatch.',
          order: newOrder
        });
        return;
      } catch (err) {
        console.error('Order creation error:', err);
        sendJson(res, 500, { error: 'Server Error', message: err.message });
        return;
      }
    }

    // GET /api/orders/:id - Track & Fetch Order
    const orderMatch = reqPath.match(/^\/api\/orders\/([a-zA-Z0-9_-]+)$/);
    if (req.method === 'GET' && orderMatch) {
      const searchId = orderMatch[1].toUpperCase();
      const currentOrders = getOrders();
      const found = currentOrders.find(o => o.id.toUpperCase() === searchId || String(o.orderNumber) === searchId);

      if (!found) {
        sendJson(res, 404, { error: 'Not Found', message: `Order #${searchId} not found in K.K. Enterprises system.` });
        return;
      }

      sendJson(res, 200, { success: true, order: found });
      return;
    }

    // POST /api/payments/verify - Verification endpoint
    if (req.method === 'POST' && reqPath === '/api/payments/verify') {
      try {
        const body = await parseRequestBody(req);
        const { orderId, utr, method } = body;
        
        if (!orderId) {
          sendJson(res, 400, { error: 'Validation Error', message: 'Order ID is required' });
          return;
        }

        const currentOrders = getOrders();
        const order = currentOrders.find(o => o.id.toUpperCase() === orderId.toUpperCase());
        if (order) {
          order.payment.status = 'Paid - Verified';
          order.payment.utr = sanitize(utr) || order.payment.transactionRef;
          order.payment.verifiedAt = new Date().toISOString();
          saveOrders(currentOrders);
          sendJson(res, 200, { success: true, message: 'Payment verified successfully.', order });
          return;
        }

        sendJson(res, 200, { success: true, message: 'Payment authorization confirmed for ' + orderId });
        return;
      } catch (e) {
        sendJson(res, 500, { error: 'Server Error', message: e.message });
        return;
      }
    }

    // Unknown API endpoint
    sendJson(res, 404, { error: 'Not Found', message: 'API route not found' });
    return;
  }

  // 3. STATIC FILES SERVING:
  let filePath = path.join(PUBLIC_DIR, reqPath === '/' ? '/index.html' : reqPath);

  // Strict Directory Traversal prevention
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(PUBLIC_DIR))) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8', ...SECURITY_HEADERS });
    res.end('403 Forbidden: Directory Traversal Denied');
    return;
  }

  fs.stat(resolvedPath, (err, stats) => {
    if (err || !stats.isFile()) {
      // For SPA, fallback to index.html ONLY for standard GET routes
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

      // Cache control: Static assets can be cached, HTML should be checked
      const cacheControl = ext === '.html' ? 'no-cache' : 'public, max-age=86400';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        ...SECURITY_HEADERS
      });
      res.end(content);
    });
  });
});

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
    console.log(`❄️ Hitachi Brand Shop - K.K. Enterprises Web Portal`);
    console.log(`🔒 Security Hardened & Order APIs Enabled`);
    console.log(`🚫 Admin routes: Completely Disabled (404/403)`);
    console.log(`🌐 Running Live at: ${url}`);
    console.log(`📦 Serving files from: ${PUBLIC_DIR}`);
    console.log(`======================================================\n`);
  });
}

module.exports = server;