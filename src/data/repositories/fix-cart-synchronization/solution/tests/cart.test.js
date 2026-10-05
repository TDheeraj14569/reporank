const { updateItemQuantity } = require("../src/services/cartService");

test("Total should update when quantity changes", () => {
  const cart = { items: [{ id: 1, price: 10, quantity: 1 }], total: 10 };
  updateItemQuantity(cart, 1, 3);
  if (cart.total !== 30) throw new Error("Total not updated");
});
