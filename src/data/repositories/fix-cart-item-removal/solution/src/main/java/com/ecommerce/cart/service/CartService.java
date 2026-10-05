package com.ecommerce.cart.service;

import com.ecommerce.cart.model.Cart;
import com.ecommerce.cart.model.CartItem;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CartService {
    private final Map<String, Cart> cartStorage = new HashMap<>();

    public Cart createCart(String cartId) {
        Cart cart = new Cart(cartId, new java.util.ArrayList<>());
        cartStorage.put(cartId, cart);
        return cart;
    }

    public Cart getCart(String cartId) {
        return cartStorage.get(cartId);
    }

    public void addItem(String cartId, CartItem item) {
        Cart cart = cartStorage.get(cartId);
        if (cart != null) {
            cart.getItems().add(item);
        }
    }

    public void removeItem(String cartId, String productId) {
        Cart cart = cartStorage.get(cartId);
        if (cart != null) {
            // FIX: Using removeIf to safely remove items during iteration
            cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        }
    }
}
