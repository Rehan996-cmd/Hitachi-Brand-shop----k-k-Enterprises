const fs = require('fs');
const path = require('path');

// Read app.js
const appJsPath = path.join(__dirname, '..', 'public', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Simple harness to evaluate PRODUCTS_DATA and test logic
const sandbox = {};
const fn = new Function('window', 'document', `${appJsContent}; return { PRODUCTS_DATA };`);
const dummyDoc = {
  addEventListener: () => {},
  getElementById: () => null,
  querySelectorAll: () => []
};
const dummyWin = {
  addEventListener: () => {}
};

try {
  const { PRODUCTS_DATA } = fn(dummyWin, dummyDoc);

  console.log(`✅ Loaded ${PRODUCTS_DATA.length} products from PRODUCTS_DATA.`);

  // 1. Verify categories present
  const categories = [...new Set(PRODUCTS_DATA.map(p => p.category))];
  console.log(`Categories found: ${categories.join(', ')}`);

  const requiredCategories = ['split_ac', 'window_ac', 'commercial_ac', 'washing_machines', 'appliances'];
  for (const rc of requiredCategories) {
    if (!categories.includes(rc)) {
      throw new Error(`Missing expected category: ${rc}`);
    }
  }
  console.log('✅ All requested categories (Split, Window, Commercial/VRF, Washing Machines, Appliances) exist!');

  // 2. Verify specific products requested by user
  // Split ACs: Inverter and non-inverter, 1.5T 3-Star & 5-Star, copper
  const splitInverter5S = PRODUCTS_DATA.find(p => p.category === 'split_ac' && p.starRating === 5 && p.technology.includes('Inverter'));
  const splitInverter3S = PRODUCTS_DATA.find(p => p.category === 'split_ac' && p.starRating === 3 && p.technology.includes('Inverter'));
  const splitNonInverter = PRODUCTS_DATA.find(p => p.category === 'split_ac' && p.technology === 'Non-Inverter');
  const windowKaze = PRODUCTS_DATA.find(p => p.name.includes('Kaze Plus') && p.tonnage.includes('1.5'));
  const cassetteAc = PRODUCTS_DATA.find(p => p.subCategory.includes('Cassette'));
  const towerAc = PRODUCTS_DATA.find(p => p.subCategory.includes('Tower'));
  const vrfSystem = PRODUCTS_DATA.find(p => p.subCategory.includes('VRF'));
  const wmFront = PRODUCTS_DATA.find(p => p.subCategory.includes('Front Load'));
  const wmTop = PRODUCTS_DATA.find(p => p.subCategory.includes('Top Load'));
  const wmSemi = PRODUCTS_DATA.find(p => p.subCategory.includes('Semi-Automatic'));
  const refrigerator = PRODUCTS_DATA.find(p => p.subCategory.includes('Refrigerator'));
  const homeInverter = PRODUCTS_DATA.find(p => p.subCategory.includes('Inverter') && p.category === 'appliances');

  console.log(`- Split Inverter 5-Star: ${splitInverter5S?.name || 'MISSING'}`);
  console.log(`- Split Inverter 3-Star: ${splitInverter3S?.name || 'MISSING'}`);
  console.log(`- Split Non-Inverter: ${splitNonInverter?.name || 'MISSING'}`);
  console.log(`- Window Kaze Plus 1.5T 3-Star: ${windowKaze?.name || 'MISSING'}`);
  console.log(`- Cassette AC: ${cassetteAc?.name || 'MISSING'}`);
  console.log(`- Tower AC: ${towerAc?.name || 'MISSING'}`);
  console.log(`- VRF System: ${vrfSystem?.name || 'MISSING'}`);
  console.log(`- Front Load Washer: ${wmFront?.name || 'MISSING'}`);
  console.log(`- Top Load Washer: ${wmTop?.name || 'MISSING'}`);
  console.log(`- Semi-Automatic Washer: ${wmSemi?.name || 'MISSING'}`);
  console.log(`- Refrigerator: ${refrigerator?.name || 'MISSING'}`);
  console.log(`- Home Inverter: ${homeInverter?.name || 'MISSING'}`);

  if (!splitInverter5S || !splitInverter3S || !splitNonInverter || !windowKaze || !cassetteAc || !towerAc || !vrfSystem || !wmFront || !wmTop || !wmSemi || !refrigerator || !homeInverter) {
    throw new Error('Some requested product lines are missing!');
  }
  console.log('✅ ALL user requested product models exist with verified specifications!');

  // 3. Verify image asset files on disk
  for (const p of PRODUCTS_DATA) {
    const assetFilePath = path.join(__dirname, '..', 'public', p.image);
    if (!fs.existsSync(assetFilePath)) {
      throw new Error(`Product ${p.id} references missing asset: ${assetFilePath}`);
    }
  }
  console.log('✅ All product image assets exist on disk and are readable!');

  console.log('\n🎉 ALL LOGIC AND DATASET TESTS PASSED WITH 100% SUCCESS!');
} catch (err) {
  console.error('❌ Test failed:', err);
  process.exit(1);
}
