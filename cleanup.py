import re

broken = [
    'fix-cart-synchronization',
    'fix-concurrent-account-updates',
    'fix-duplicate-review-prevention',
    'fix-employee-leave-validation',
    'fix-notification-preference-update',
    'fix-payment-retry-logic',
    'fix-shipment-state-transitions',
    'repair-book-return-handling',
    'repair-inventory-reservation'
]

# 1. Clean available-slugs
with open('src/lib/data/available-slugs.ts', 'r', encoding='utf-8') as f:
    slugs = f.read()

for b in broken:
    slugs = re.sub(r'\s*"' + b + '",?', '', slugs)

with open('src/lib/data/available-slugs.ts', 'w', encoding='utf-8') as f:
    f.write(slugs)

# 2. Clean challenges-metadata
with open('src/lib/data/challenges-metadata.ts', 'r', encoding='utf-8') as f:
    meta = f.read()

for b in broken:
    # Match the block from { to }, followed by optionally a comma, where slug is b
    pattern = r'\{\s*"id":\s*\d+,\s*"slug":\s*"' + b + r'".*?\}\s*(?=[,\]])'
    # Use re.DOTALL so .* matches newlines
    meta = re.sub(pattern, '', meta, flags=re.DOTALL)
    # clean up dangling commas
    meta = meta.replace(',,', ',')

with open('src/lib/data/challenges-metadata.ts', 'w', encoding='utf-8') as f:
    f.write(meta)

print('Cleaned TS files')
