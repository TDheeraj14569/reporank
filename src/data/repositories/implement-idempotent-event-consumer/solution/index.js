// A simple mock database
const db = {
  users: {
    'user-1': { balance: 100 }
  },
  processedEvents: new Set()
};

async function processPaymentEvent(event) {
  // Check for idempotency: if the event was already processed, ignore it
  if (db.processedEvents.has(event.eventId)) {
    return db.users[event.userId].balance;
  }

  const user = db.users[event.userId];
  if (!user) throw new Error('User not found');
  
  user.balance -= event.amount;
  
  // Mark event as processed
  db.processedEvents.add(event.eventId);

  return user.balance;
}

module.exports = { processPaymentEvent, db };
