package com.stripe.orderservice.controller;

import com.stripe.orderservice.dto.OrderRequest;
import com.stripe.orderservice.model.Order;
import com.stripe.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/{id}/ship")
    public ResponseEntity<Order> shipOrder(@PathVariable Long id) {
        Order order = orderService.shipOrder(id);
        return ResponseEntity.ok(order);
    }
}
