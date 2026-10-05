package com.reporank.order.service;
import com.reporank.order.model.Order;
import com.reporank.order.model.OrderState;
import com.reporank.order.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final CatalogService catalogService;
    public OrderService(OrderRepository orderRepository, CatalogService catalogService) {
        this.orderRepository = orderRepository;
        this.catalogService = catalogService;
    }
    @Transactional
    public Order createOrder(Order order) {
        // BUG: Missing validation for order items against catalog and empty check
        // BUG: Missing initialization of order state to PENDING
        return orderRepository.save(order);
    }
    @Transactional
    public Order updateOrderState(Long orderId, OrderState newState) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        // BUG: Missing strict state transition check (e.g. PENDING -> SHIPPED -> DELIVERED)
        order.setState(newState);
        return orderRepository.save(order);
    }
}
