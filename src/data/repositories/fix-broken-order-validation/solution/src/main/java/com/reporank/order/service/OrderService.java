package com.reporank.order.service;
import com.reporank.order.model.Order;
import com.reporank.order.model.OrderItem;
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
        if (order.getItems() == null || order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item");
        }
        for (OrderItem item : order.getItems()) {
            if (!catalogService.isProductValid(item.getProductId())) {
                throw new IllegalArgumentException("Invalid product ID: " + item.getProductId());
            }
        }
        order.setState(OrderState.PENDING);
        return orderRepository.save(order);
    }
    @Transactional
    public Order updateOrderState(Long orderId, OrderState newState) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        if (order.getState() == OrderState.PENDING && newState != OrderState.SHIPPED && newState != OrderState.CANCELLED) {
            throw new IllegalArgumentException("Invalid state transition from PENDING");
        }
        if (order.getState() == OrderState.SHIPPED && newState != OrderState.DELIVERED && newState != OrderState.CANCELLED) {
            throw new IllegalArgumentException("Invalid state transition from SHIPPED");
        }
        if (order.getState() == OrderState.DELIVERED || order.getState() == OrderState.CANCELLED) {
            throw new IllegalArgumentException("Order is in a terminal state");
        }
        order.setState(newState);
        return orderRepository.save(order);
    }
}
