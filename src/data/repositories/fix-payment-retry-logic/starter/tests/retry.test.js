const { processPayment, transactions } = require("../src/services/paymentService");

test("Retry should not duplicate charge", async () => {
  transactions.length = 0;
  await processPayment({ amount: 100, idempotencyKey: "abc" });
  await processPayment({ amount: 100, idempotencyKey: "abc" });
  
  if (transactions.length > 1) {
    throw new Error("Duplicate charge created!");
  }
});
