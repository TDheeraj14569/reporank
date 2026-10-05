import { challengesMetadata } from '../src/lib/data/challenges-metadata';
const hard = challengesMetadata.filter(c => c.difficulty === 'hard').slice(0, 3).map(c => c.slug);
const expert = challengesMetadata.filter(c => c.difficulty === 'expert').slice(0, 2).map(c => c.slug);
console.log('Hard:', hard.join(', '));
console.log('Expert:', expert.join(', '));
