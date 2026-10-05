package com.ecommerce.cart;

import com.ecommerce.cart.model.Cart;
import com.ecommerce.cart.model.CartItem;
import com.ecommerce.cart.service.CartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ConcurrentModificationException;

import static org.junit.jupiter.api.Assertions.*;

class CartServiceTest {

    private CartService cartService;

    @BeforeEach
    void setUp() {
        cartService = new CartService();
    }

    @Test
    void testRemoveItem() {
        String cartId = "cart-1";
        cartService.createCart(cartId);
        cartService.addItem(cartId, new CartItem("prod-1", 1, 10.0));
        cartService.addItem(cartId, new CartItem("prod-2", 2, 20.0));
        cartService.addItem(cartId, new CartItem("prod-3", 1, 15.0));

        // This should not throw ConcurrentModificationException
        assertDoesNotThrow(() -> {
            cartService.removeItem(cartId, "prod-2");
        }, "Removing an item should not throw an exception");

        Cart cart = cartService.getCart(cartId);
        assertEquals(2, cart.getItems().size(), "Cart should have 2 items remaining");
        assertFalse(cart.getItems().stream().anyMatch(i -> i.getProductId().equals("prod-2")), "Item prod-2 should be removed");
    }

    @Test
    void testRemoveItemWhenMultipleSameProduct() {
        String cartId = "cart-2";
        cartService.createCart(cartId);
        cartService.addItem(cartId, new CartItem("prod-1", 1, 10.0));
        cartService.addItem(cartId, new CartItem("prod-1", 2, 20.0)); // duplicate product id, perhaps different options
        cartService.addItem(cartId, new CartItem("prod-3", 1, 15.0));

        assertDoesNotThrow(() -> {
            cartService.removeItem(cartId, "prod-1");
        }, "Removing multiple items with same ID should not throw an exception");

        Cart cart = cartService.getCart(cartId);
        assertEquals(1, cart.getItems().size(), "Cart should have 1 item remaining");
        assertEquals("prod-3", cart.getItems().get(0).getProductId(), "Remaining item should be prod-3");
    }
}
