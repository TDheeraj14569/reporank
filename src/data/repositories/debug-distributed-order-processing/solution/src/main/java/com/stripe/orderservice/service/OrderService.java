package com.stripe.orderservice.service;

import com.stripe.orderservice.dto.OrderItemRequest;
import com.stripe.orderservice.dto.OrderRequest;
import com.stripe.orderservice.exception.InvalidOrderStateException;
import com.stripe.orderservice.model.Order;
import com.stripe.orderservice.model.OrderItem;
import com.stripe.orderservice.model.OrderStatus;
import com.stripe.orderservice.model.Product;
import com.stripe.orderservice.repository.OrderRepository;
import com.stripe.orderservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        order.setStatus(OrderStatus.PENDING);

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findByIdForUpdate(itemRequest.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found"));

            if (product.getAvailableQuantity() < itemRequest.getQuantity()) {
                throw new IllegalArgumentException("Not enough inventory for product: " + product.getSku());
            }

            product.setAvailableQuantity(product.getAvailableQuantity() - itemRequest.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(product.getId());
            orderItem.setQuantity(itemRequest.getQuantity());
            order.addItem(orderItem);
        }

        return orderRepository.save(order);
    }

    @Transactional
    public Order shipOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new InvalidOrderStateException("Order must be in PENDING state to be shipped");
        }
        order.setStatus(OrderStatus.SHIPPED);
        return orderRepository.save(order);
    }
}
