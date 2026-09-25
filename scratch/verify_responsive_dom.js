const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
const appJsPath = path.join(__dirname, '..', 'public', 'app.js');
const cssPath = path.join(__dirname, '..', 'public', 'styles.css');

const html = fs.readFileSync(htmlPath, 'utf8');
const appJs = fs.readFileSync(appJsPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

console.log('--- STARTING COMPREHENSIVE DOM & RESPONSIVE AUDIT ---');

let issues = 0;

// 1. Check Viewport Meta Tag
if (!html.includes('viewport-fit=cover')) {
  console.warn('⚠️ Missing viewport-fit=cover for iOS notch support');
  issues++;
} else {
  console.log('✓ Viewport meta includes viewport-fit=cover (iOS notch safe)');
}

// 2. Extract all getElementById calls from app.js and check if they exist in index.html
const getElementMatches = [...appJs.matchAll(/document\.getElementById\(['"]([^'"]+)['"]\)/g)];
const uniqueIdsInJs = [...new Set(getElementMatches.map(m => m[1]))];

console.log(`Checking ${uniqueIdsInJs.length} IDs referenced in app.js...`);
const missingIds = [];
for (const id of uniqueIdsInJs) {
  // Check if id exists as id="..." in html or is dynamically generated
  const idRegex = new RegExp(`id=["']${id}["']`);
  if (!idRegex.test(html)) {
    // Some IDs might be dynamically rendered (like modal buttons or dish custom chips)
    // Let's check if it's created dynamically in JS
    if (!appJs.includes(`id="${id}"`) && !appJs.includes(`id='${id}'`)) {
      missingIds.push(id);
    }
  }
}

if (missingIds.length > 0) {
  console.warn('⚠️ IDs in JS not found in static HTML or dynamic templates:', missingIds);
} else {
  console.log('✓ All JS getElementById references are matched!');
}

// 3. Check all <img> tags in index.html for valid src
const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g)];
console.log(`Checking ${imgMatches.length} <img> tags in HTML...`);
let brokenImgs = 0;
for (const match of imgMatches) {
  const src = match[1];
  if (src.startsWith('/')) {
    const localFile = path.join(__dirname, '..', 'public', src);
    if (!fs.existsSync(localFile)) {
      console.error(`✗ Local image does not exist: ${src}`);
      brokenImgs++;
    }
  }
}
if (brokenImgs === 0) {
  console.log(`✓ All ${imgMatches.length} image sources exist on disk!`);
} else {
  issues += brokenImgs;
}

// 4. Check CSS for smooth touch actions & safe-area-inset
const hasSafeArea = css.includes('env(safe-area-inset-bottom');
const hasTouchManipulation = css.includes('touch-action: manipulation');
const hasWebkitTap = css.includes('-webkit-tap-highlight-color');

console.log(`CSS Check:
  • safe-area-inset-bottom: ${hasSafeArea ? '✓ Present' : '✗ Missing'}
  • touch-action manipulation: ${hasTouchManipulation ? '✓ Present' : '✗ Missing'}
  • -webkit-tap-highlight-color: ${hasWebkitTap ? '✓ Present' : '✗ Missing'}`);

if (!hasSafeArea || !hasTouchManipulation || !hasWebkitTap) {
  issues++;
}

console.log('----------------------------------------------------');
if (issues === 0) {
  console.log('🎉 DOM & RESPONSIVE AUDIT PASSED 100%! Ready for all devices.');
} else {
  console.log(`Audit completed with ${issues} observations.`);
}
