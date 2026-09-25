const fs = require('fs');

function checkFile(filePath) {
  console.log(`=== Checking ${filePath} ===`);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const hindiRegex = /[\u0900-\u097F]/;
  let count = 0;
  lines.forEach((line, idx) => {
    if (hindiRegex.test(line)) {
      count++;
      console.log(`Line ${idx + 1}: ${line.trim().substring(0, 100)}`);
    }
  });
  console.log(`Total Hindi lines found: ${count}\n`);
}

checkFile('public/index.html');
checkFile('public/app.js');

const path = require('path');
function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        scanDir(full);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.json'))) {
      checkFile(full);
    }
  }
}
scanDir('nextjs-app/src');
