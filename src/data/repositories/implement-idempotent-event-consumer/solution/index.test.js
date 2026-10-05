const { processPaymentEvent, db } = require('./index');

describe('Event Consumer', () => {
  beforeEach(() => {
    // Reset DB state
    db.users['user-1'] = { balance: 100 };
    db.processedEvents = new Set();
  });

  it('should process a valid payment event', async () => {
    const event = { eventId: 'evt-1', userId: 'user-1', amount: 20 };
    const balance = await processPaymentEvent(event);
    expect(balance).toBe(80);
    expect(db.users['user-1'].balance).toBe(80);
  });

  it('should process duplicate events idempotently', async () => {
    const event = { eventId: 'evt-2', userId: 'user-1', amount: 30 };
    
    // First time processing
    await processPaymentEvent(event);
    expect(db.users['user-1'].balance).toBe(70);

    // Second time processing (duplicate event)
    // The consumer should recognize it has already processed 'evt-2' 
    // and not deduct the balance again.
    await processPaymentEvent(event);
    expect(db.users['user-1'].balance).toBe(70);
  });
});
