const fs = require('fs');
const path = require('path');

const metaPath = 'src/lib/data/challenges-metadata.ts';
let metaContent = fs.readFileSync(metaPath, 'utf8');

const match = metaContent.match(/export const challengesMetadata[^\[]+(\[[\s\S]*\]);/);
if (match) {
  let metaArr = eval(match[1]);
  
  let modified = false;
  metaArr = metaArr.map(c => {
    const repoPath = path.join('src/data/repositories', c.slug, 'starter');
    if (!fs.existsSync(repoPath)) return c;
    
    // Determine actual language
    let actualLang = 'unknown';
    try {
        const files = fs.readdirSync(repoPath, { recursive: true });
        if (files.some(f => f.endsWith('.go'))) actualLang = 'go';
        else if (files.some(f => f.endsWith('.java'))) actualLang = 'java';
        else if (files.some(f => f.endsWith('.py'))) actualLang = 'python';
        else if (files.some(f => f.endsWith('.cpp'))) actualLang = 'cpp';
        else if (files.some(f => f.endsWith('.ts') || f.endsWith('.js'))) actualLang = 'node';
    } catch(e) {}
    
    // Some declared languages were capitalized differently in the DB initially (e.g. "Java", "Python", "Node.js").
    // We should just use the actualLang to determine what to set.
    
    let isMismatch = false;
    const declaredLang = c.language ? c.language.toLowerCase() : '';
    
    if (actualLang === 'go' && declaredLang !== 'go') isMismatch = true;
    if (actualLang === 'java' && declaredLang !== 'java') isMismatch = true;
    if (actualLang === 'python' && declaredLang !== 'python') isMismatch = true;
    if (actualLang === 'node' && declaredLang !== 'node') isMismatch = true;
    if (actualLang === 'cpp' && declaredLang !== 'cpp') isMismatch = true;

    if (isMismatch) {
        modified = true;
        console.log('Fixing ' + c.slug + ' -> ' + actualLang);
        
        c.language = actualLang;
        
        if (actualLang === 'go') c.technology = ['Go'];
        if (actualLang === 'java') c.technology = ['Java', 'Spring Boot'];
        if (actualLang === 'python') c.technology = ['Python', 'FastAPI'];
        if (actualLang === 'node') c.technology = ['Node.js', 'Express'];
        if (actualLang === 'cpp') c.technology = ['C++'];
    }
    
    return c;
  });
  
  if (modified) {
     const newJson = JSON.stringify(metaArr, null, 2);
     metaContent = metaContent.replace(/export const challengesMetadata[^\[]+\[[\s\S]*\];/, 'export const challengesMetadata: ChallengeMetadata[] = ' + newJson + ';');
     fs.writeFileSync(metaPath, metaContent);
     console.log('Saved corrected metadata!');
  }
}
