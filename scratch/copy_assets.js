const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/Rehan Jatu/.gemini/antigravity-ide/brain/c542bce8-984f-4719-b0d9-a524bc5a4d0e';
const destDir = path.join(__dirname, '..', 'public', 'assets');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(function(f) { return f.endsWith('.jpg'); });
files.forEach(function(f) {
  let destName = null;
  if (f.startsWith('shivansh_hotel_facade')) destName = 'shivansh_facade.jpg';
  else if (f.startsWith('paneer_butter_masala')) destName = 'dish_paneer.jpg';
  else if (f.startsWith('tandoori_starters')) destName = 'dish_starters.jpg';
  else if (f.startsWith('dum_biryani')) destName = 'dish_biryani.jpg';

  if (destName) {
    fs.copyFileSync(path.join(srcDir, f), path.join(destDir, destName));
    console.log('Copied ' + f + ' -> ' + destName);
  }
});
