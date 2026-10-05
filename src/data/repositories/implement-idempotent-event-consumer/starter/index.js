// A simple mock database
const db = {
  users: {
    'user-1': { balance: 100 }
  },
  processedEvents: new Set()
};

async function processPaymentEvent(event) {
  // TODO: Ensure this function is idempotent. 
  // If the same event (same eventId) is processed multiple times, 
  // the balance should only be decremented once.
  
  const user = db.users[event.userId];
  if (!user) throw new Error('User not found');
  
  user.balance -= event.amount;
  
  return user.balance;
}

module.exports = { processPaymentEvent, db };
