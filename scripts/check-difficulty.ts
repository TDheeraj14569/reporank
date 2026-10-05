import fs from 'fs';
import { challengesMetadata } from '../src/lib/data/challenges-metadata';

const generated = fs.readdirSync('src/data/repositories');
const generatedMeta = challengesMetadata.filter(c => generated.includes(c.slug));

const counts: Record<string, number> = {};
generatedMeta.forEach(c => {
  counts[c.difficulty] = (counts[c.difficulty] || 0) + 1;
});

console.log(counts);
