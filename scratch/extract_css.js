const fs = require('fs');
const content = fs.readFileSync('scratch/temp_css.txt', 'utf8');
const lines = content.split('\n');
const cssLines = lines.slice(8).join('\n');
fs.writeFileSync('public/styles.css', cssLines, 'utf8');
console.log('Saved public/styles.css, size:', fs.statSync('public/styles.css').size);
