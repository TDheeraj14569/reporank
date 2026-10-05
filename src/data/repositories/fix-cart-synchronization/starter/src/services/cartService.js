function updateItemQuantity(cart, itemId, quantity) {
  const item = cart.items.find(i => i.id === itemId);
  if (item) {
    item.quantity = quantity;
    // BUG: Missing cart.total = calculateTotal(cart.items);
  }
  return cart;
}
module.exports = { updateItemQuantity };
