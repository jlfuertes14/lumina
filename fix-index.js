const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Remove the problematic production artifact links
content = content.replace(/<script type="module" crossorigin src="\/lumina\/assets\/index-8dkoB_Bf\.js"><\/script>/g, '');
content = content.replace(/<link rel="stylesheet" crossorigin href="\/lumina\/assets\/index-lLubqzSV\.css">/g, '');

// Ensure main.js is included if not present
if (!content.includes('src="/main.js"')) {
    content = content.replace('</div>', '</div>\n    <script type="module" src="/main.js"></script>');
}

fs.writeFileSync(indexPath, content);
console.log('index.html cleaned successfully');
