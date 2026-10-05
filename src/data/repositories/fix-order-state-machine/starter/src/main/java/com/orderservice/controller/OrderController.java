package com.orderservice.controller;

import com.orderservice.service.OrderService;
import com.orderservice.model.OrderStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PutMapping("/{id}/status")
    public void updateStatus(@PathVariable String id, @RequestParam OrderStatus status) {
        orderService.updateOrderStatus(id, status);
    }
}
