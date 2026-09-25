const fs = require('fs');
const path = require('path');

function findEmojis(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') findEmojis(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const emojiRegex = /(\p{Extended_Pictographic}|\p{Emoji_Presentation})/gu;
      const matches = content.match(emojiRegex);
      if (matches) {
        console.log(fullPath, 'has', matches.length, 'emojis:', [...new Set(matches)].join(' '));
      }
    }
  }
}
findEmojis('./nextjs-app/src');
