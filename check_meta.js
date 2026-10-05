const fs = require('fs');
const path = require('path');

const metaPath = 'src/lib/data/challenges-metadata.ts';
let metaContent = fs.readFileSync(metaPath, 'utf8');

const match = metaContent.match(/export const challengesMetadata[^\[]+(\[[\s\S]*\]);/);
if (match) {
  const metaArr = eval(match[1]);
  
  metaArr.forEach(c => {
    const repoPath = path.join('src/data/repositories', c.slug, 'starter');
    if (!fs.existsSync(repoPath)) return;
    
    // Determine actual language
    let actualLang = 'unknown';
    try {
        const files = fs.readdirSync(repoPath, { recursive: true });
        if (files.some(f => f.endsWith('.go'))) actualLang = 'go';
        else if (files.some(f => f.endsWith('.java'))) actualLang = 'java';
        else if (files.some(f => f.endsWith('.py'))) actualLang = 'python';
        else if (files.some(f => f.endsWith('.cpp'))) actualLang = 'cpp';
        else if (files.some(f => f.endsWith('.ts') || f.endsWith('.js'))) actualLang = 'node';
        
        const declaredLang = c.language;
        if (actualLang !== declaredLang && actualLang !== 'unknown') {
        console.log(c.slug + ' | Declared: ' + declaredLang + ' | Actual: ' + actualLang);
        }
    } catch(e) {}
  });
}
