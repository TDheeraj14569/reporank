const fs = require('fs');
const files = [
    'src/data/repositories/fix-order-state-machine/starter/src/main/java/com/orderservice/model/Order.java',
    'src/data/repositories/fix-order-state-machine/solution/src/main/java/com/orderservice/model/Order.java'
];

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/javax\.persistence/g, 'jakarta.persistence');
    fs.writeFileSync(file, content);
}
console.log('Fixed javax to jakarta');
