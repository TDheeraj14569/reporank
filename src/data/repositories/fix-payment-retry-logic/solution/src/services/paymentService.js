const transactions = [];

async function processPayment(data) {
  const { amount, idempotencyKey } = data;
  
  // BUG: No check if idempotencyKey already exists in transactions
  const transaction = { id: Date.now(), amount, idempotencyKey, status: "SUCCESS" };
  transactions.push(transaction);
  
  return transaction;
}

module.exports = { processPayment, transactions };
