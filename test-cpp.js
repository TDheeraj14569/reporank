const http = require('http');

const data = JSON.stringify({
  slug: 'cpp-virtual-destructor-fix',
  modifiedFiles: {
    'main.cpp': '#include <iostream>\nint main() { std::cout << \"Test passed: Hello World\"; return 0; }'
  }
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/execute',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(JSON.parse(body)));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
