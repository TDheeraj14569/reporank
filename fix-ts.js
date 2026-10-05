const fs = require('fs');

let metaContent = fs.readFileSync('src/lib/data/challenges-metadata.ts', 'utf8');
metaContent = metaContent.replace(/repositoryName: '(cpp-[^']+)',/g, "repositoryName: '$1',\n    fileCount: 3,\n    testCount: 2,");
fs.writeFileSync('src/lib/data/challenges-metadata.ts', metaContent);
console.log('Fixed challenges metadata');

let execContent = fs.readFileSync('src/lib/server/execution-engine.ts', 'utf8');
execContent = execContent.replace(/go: 'go version',\s+unknown: 'false'/, "go: 'go version',\n    cpp: 'g++ --version',\n    unknown: 'false'");
fs.writeFileSync('src/lib/server/execution-engine.ts', execContent);
console.log('Fixed execution engine');
