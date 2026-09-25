const fs = require('fs');
const path = require('path');

function verifyFullSystem() {
  console.log('=== VERIFYING FULL MULTI-DEVICE & UI SUITE ===');
  let errors = 0;

  const html = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, '../public/styles.css'), 'utf8');
  const js = fs.readFileSync(path.join(__dirname, '../public/app.js'), 'utf8');
  const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));

  // 1. Check iOS / Android safe area & notch support
  if (html.includes('viewport-fit=cover') && css.includes('env(safe-area-inset-bottom')) {
    console.log('✅ Mobile Notch & Safe Area: Configured with viewport-fit=cover and env(safe-area-inset-bottom)');
  } else {
    console.error('❌ Mobile Notch: Missing safe area handling');
    errors++;
  }

  // 2. Check Mobile Bottom Navigation Bar
  const mobNavElements = ['mobileBottomNav', 'mobNavHome', 'mobNavMenu', 'mobNavBrew', 'mobNavReserve', 'mobNavBag', 'mobBagBadge'];
  for (const id of mobNavElements) {
    if (html.includes(`id="${id}"`)) {
      console.log(`✅ Mobile Bottom Nav: #${id} found`);
    } else {
      console.error(`❌ Mobile Bottom Nav: Missing #${id}`);
      errors++;
    }
  }

  // 3. Check Desktop Floating Pill Nav
  const desktopNav = ['navHomeBtn', 'navMenuBtn', 'navBrewBtn', 'navReserveBtn', 'soundToggleBtn', 'navBagBtn'];
  for (const id of desktopNav) {
    if (html.includes(`id="${id}"`)) {
      console.log(`✅ Desktop Nav: #${id} found`);
    } else {
      console.error(`❌ Desktop Nav: Missing #${id}`);
      errors++;
    }
  }

  // 4. Check Hero & Live Status Clock
  if (html.includes('id="liveStatusBadge"') && html.includes('id="heroParticlesCanvas"')) {
    console.log('✅ Hero & Status Clock: Found live status badge and particles canvas');
  } else {
    console.error('❌ Hero & Status Clock: Missing badge or canvas');
    errors++;
  }

  // 5. Check Interactive "Find Your Brew" Mood Matcher
  if (html.includes('id="brewMatcherSection"') && html.includes('data-mood="cold"') && html.includes('id="btnQuickAddQuiz"')) {
    console.log('✅ Find Your Brew Quiz: Section, mood buttons, and 1-tap add to bag verified');
  } else {
    console.error('❌ Find Your Brew Quiz: Incomplete elements');
    errors++;
  }

  // 6. Check VIP Table Reservation & Pass Visualizer
  const resElements = ['reservationForm', 'vipPassCard', 'passGuestName', 'passPartySize', 'passDate', 'passTime', 'passZone'];
  for (const id of resElements) {
    if (html.includes(`id="${id}"`)) {
      console.log(`✅ VIP Reservation Pass: #${id} found`);
    } else {
      console.error(`❌ VIP Reservation Pass: Missing #${id}`);
      errors++;
    }
  }

  // 7. Check Order Bag Drawer with Dining Modes
  if (html.includes('id="cartDrawer"') && html.includes('data-mode="dine-in"') && html.includes('data-mode="takeaway"') && html.includes('data-mode="delivery"')) {
    console.log('✅ Order Bag Drawer: Dine-in, Takeaway, and Delivery modes present');
  } else {
    console.error('❌ Order Bag Drawer: Missing dining mode controls');
    errors++;
  }

  // 8. Check 60fps & Responsive Rules in CSS
  const cssChecks = [
    { name: 'Mobile Media Query (<= 768px)', query: '@media (max-width: 768px)' },
    { name: 'Tablet & iPad Media Query (769px - 1024px)', query: '@media (min-width: 769px) and (max-width: 1024px)' },
    { name: 'Spring Easing Curves', query: '--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)' },
    { name: 'Deep Artisanal Palette', query: '--bg-base: #0d0f0b' },
    { name: 'Custom Modern Scrollbar', query: '::-webkit-scrollbar' }
  ];
  for (const c of cssChecks) {
    if (css.includes(c.query)) {
      console.log(`✅ CSS Polish: ${c.name} verified`);
    } else {
      console.error(`❌ CSS Polish: Missing ${c.name}`);
      errors++;
    }
  }

  // 9. Check Products Catalog
  if (products.length >= 18) {
    console.log(`✅ Catalog Depth: ${products.length} authentic dishes/drinks configured`);
  } else {
    console.error(`❌ Catalog Depth: Found only ${products.length} items`);
    errors++;
  }

  console.log(`\n=== Verification Finished with ${errors} error(s) ===`);
  process.exit(errors > 0 ? 1 : 0);
}

verifyFullSystem();
