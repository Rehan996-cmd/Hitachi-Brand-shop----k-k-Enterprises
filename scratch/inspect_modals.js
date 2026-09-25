const fs = require('fs');
const lines = fs.readFileSync('public/app.js', 'utf8').split('\n');

lines.forEach((line, idx) => {
  if (line.includes('function setupDishCustomModal') || line.includes('function setupReviewModal') || line.includes('setupCraftSection')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
