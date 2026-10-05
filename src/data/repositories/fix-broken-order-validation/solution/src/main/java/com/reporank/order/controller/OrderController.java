package com.reporank.order.controller;
import com.reporank.order.model.Order;
import com.reporank.order.model.OrderState;
import com.reporank.order.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            Order created = orderService.createOrder(order);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/{id}/state")
    public ResponseEntity<?> updateOrderState(@PathVariable Long id, @RequestParam OrderState state) {
        try {
            Order updated = orderService.updateOrderState(id, state);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
