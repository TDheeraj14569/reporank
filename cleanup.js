const fs = require('fs');
const broken = [
    'fix-cart-synchronization',
    'fix-concurrent-account-updates',
    'fix-duplicate-review-prevention',
    'fix-employee-leave-validation',
    'fix-notification-preference-update',
    'fix-payment-retry-logic',
    'fix-shipment-state-transitions',
    'repair-book-return-handling',
    'repair-inventory-reservation'
];

let slugs = fs.readFileSync('src/lib/data/available-slugs.ts', 'utf8');
for (let b of broken) {
    let re = new RegExp(`\\s*"${b}",?`, 'g');
    slugs = slugs.replace(re, '');
}
fs.writeFileSync('src/lib/data/available-slugs.ts', slugs);

let meta = fs.readFileSync('src/lib/data/challenges-metadata.ts', 'utf8');
for (let b of broken) {
    let re = new RegExp(`\\{\\s*"id":\\s*\\d+,\\s*"slug":\\s*"${b}"[\\s\\S]*?\\}\\s*,?`, 'g');
    meta = meta.replace(re, '');
}
meta = meta.replace(/,\s*\]/, '\n]');
fs.writeFileSync('src/lib/data/challenges-metadata.ts', meta);
console.log('Done');
