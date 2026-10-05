const fs = require('fs');
const path = 'src/lib/data/challenges-metadata.ts';
let content = fs.readFileSync(path, 'utf8');

// Just remove all instances of multiple closing braces with commas right before id 111
const id111Idx = content.indexOf('"id": 111');
if (id111Idx !== -1) {
    const beforeStr = content.substring(0, id111Idx);
    // Looking backwards for '},' and '}'
    const cleanBeforeStr = beforeStr.replace(/\}\s*\n\s*\}\,\s*\{/g, '},\n  {').replace(/\}\s*\,\s*\{/g, '},\n  {');
    content = cleanBeforeStr + content.substring(id111Idx);
}
// Double check the top of the file 
content = content.replace(/\] \=\s*\(\[/g, '] = [');
fs.writeFileSync(path, content);
console.log('Fixed!');
