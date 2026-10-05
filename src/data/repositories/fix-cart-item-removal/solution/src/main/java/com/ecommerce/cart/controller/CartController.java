package com.ecommerce.cart.controller;

import com.ecommerce.cart.model.Cart;
import com.ecommerce.cart.model.CartItem;
import com.ecommerce.cart.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/{cartId}")
    public ResponseEntity<Cart> createCart(@PathVariable String cartId) {
        return ResponseEntity.ok(cartService.createCart(cartId));
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<Cart> getCart(@PathVariable String cartId) {
        Cart cart = cartService.getCart(cartId);
        if (cart == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/{cartId}/items")
    public ResponseEntity<Void> addItem(@PathVariable String cartId, @RequestBody CartItem item) {
        cartService.addItem(cartId, item);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{cartId}/items/{productId}")
    public ResponseEntity<Void> removeItem(@PathVariable String cartId, @PathVariable String productId) {
        try {
            cartService.removeItem(cartId, productId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
