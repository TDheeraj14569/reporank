package com.orderservice.service;

import com.orderservice.model.Order;
import com.orderservice.model.OrderStatus;
import com.orderservice.repository.OrderRepository;
import com.orderservice.exception.InvalidStateTransitionException;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public void updateOrderStatus(String orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        
        // BUG: Missing check if current status is CANCELLED
        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new InvalidStateTransitionException("Cannot change status of delivered order");
        }

        order.setStatus(newStatus);
        orderRepository.save(order);
    }
}
