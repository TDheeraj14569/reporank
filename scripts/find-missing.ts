import fs from 'fs';
import { challengesMetadata } from '../src/lib/data/challenges-metadata';

const existing = fs.readdirSync('src/data/repositories');
const missing = challengesMetadata.filter(c => !existing.includes(c.slug)).map(c => c.slug);

console.log(`${missing.length} missing`);
console.log(missing.slice(0, 20).join('\n'));
