package com.ecommerce.cart.model;

import java.util.ArrayList;
import java.util.List;

public class Cart {
    private String cartId;
    private List<CartItem> items;

    public Cart() {
        this.items = new ArrayList<>();
    }

    public Cart(String cartId, List<CartItem> items) {
        this.cartId = cartId;
        this.items = items != null ? items : new ArrayList<>();
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }
}
