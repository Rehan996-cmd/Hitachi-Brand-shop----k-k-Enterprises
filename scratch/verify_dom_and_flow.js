const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('=== VERIFYING DOM COMPONENTS ===');
    const checks = [
      { name: 'Header Cart Button', pass: html.includes('id="openCartBtn"') && html.includes('id="headerCartCount"') },
      { name: 'Track Order Button', pass: html.includes('openTrackModal()') },
      { name: 'Cart Drawer', pass: html.includes('id="cartDrawer"') && html.includes('id="cartItemsList"') },
      { name: 'Checkout Modal', pass: html.includes('id="checkoutModal"') && html.includes('handleCheckoutSubmit') },
      { name: 'UPI Dynamic QR Section', pass: html.includes('id="sectionPayUpi"') && html.includes('hitachisikar@icici') },
      { name: 'Credit/Debit Card Section', pass: html.includes('id="sectionPayCard"') && html.includes('id="cardNumber"') },
      { name: '0% Interest EMI Table', pass: html.includes('id="sectionPayEmi"') && html.includes('id="emiTableBody"') },
      { name: 'Order Success Modal', pass: html.includes('id="orderSuccessModal"') && html.includes('id="successOrderId"') },
      { name: 'Printable GST Tax Invoice', pass: html.includes('id="printableInvoiceArea"') && html.includes('TAX INVOICE / CASH MEMO') || html.includes('GST Tax Invoice') },
      { name: 'Live Order Tracking Modal', pass: html.includes('id="trackOrderModal"') && html.includes('lookupOrderTracking') }
    ];

    let allOk = true;
    checks.forEach(c => {
      console.log(`${c.pass ? '✅' : '❌'} ${c.name}: ${c.pass ? 'FOUND' : 'MISSING'}`);
      if (!c.pass) allOk = false;
    });

    console.log(`\nDOM VERIFICATION RESULT: ${allOk ? 'ALL 10 COMPONENTS VERIFIED OK' : 'SOME MISSING'}`);
    process.exit(allOk ? 0 : 1);
  });
}).on('error', err => {
  console.error('Error fetching localhost:3000:', err.message);
  process.exit(1);
});
