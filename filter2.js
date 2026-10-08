const fs = require('fs');

let ts = fs.readFileSync('src/lib/data/challenges-metadata.ts', 'utf8');

let startIndex = ts.indexOf('[');
let arrayStr = ts.substring(startIndex);
// Just remove the last semicolon specifically
arrayStr = arrayStr.substring(0, arrayStr.lastIndexOf(';'));

let arr = eval('(' + arrayStr + ')');

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

let filtered = arr.filter(c => !broken.includes(c.slug));

let header = `/* eslint-disable */

export interface ChallengeMetadata {
  id: number;
  slug: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  taskType: string;
  technology: string[];
  language: string;
  estimatedTimeMinutes: number;
  skills: string[];
  tags: string[];
  companyPattern: string;
  repositoryName: string;
  requirements: string[];
  constraints: string[];
  acceptanceCriteria: string[];
  hints: { level: number; content: string }[];
  fileCount?: number;
  testCount?: number;
}

export const challengesMetadata: ChallengeMetadata[] = `;

let newTs = header + JSON.stringify(filtered, null, 2) + ';\n';
fs.writeFileSync('src/lib/data/challenges-metadata.ts', newTs);

let slugs = fs.readFileSync('src/lib/data/available-slugs.ts', 'utf8');
let slugsStart = slugs.indexOf('[');
let slugsArrStr = slugs.substring(slugsStart).substring(0, slugs.substring(slugsStart).lastIndexOf(';'));
let slugsArr = eval('(' + slugsArrStr + ')');
let slugsFiltered = slugsArr.filter(s => !broken.includes(s));
let newSlugsTs = `export const availableSlugs = ${JSON.stringify(slugsFiltered, null, 2)};\n`;
fs.writeFileSync('src/lib/data/available-slugs.ts', newSlugsTs);
console.log("Success");
