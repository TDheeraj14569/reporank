package com.stripe.orderservice;

import com.stripe.orderservice.dto.OrderItemRequest;
import com.stripe.orderservice.dto.OrderRequest;
import com.stripe.orderservice.model.Order;
import com.stripe.orderservice.model.OrderStatus;
import com.stripe.orderservice.model.Product;
import com.stripe.orderservice.repository.OrderRepository;
import com.stripe.orderservice.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class OrderServiceTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @BeforeEach
    public void setup() {
        orderRepository.deleteAll();
        productRepository.deleteAll();
    }

    @Test
    public void testConcurrentOrderCreation() throws InterruptedException {
        Product p = new Product("SKU-123", 10);
        p = productRepository.save(p);

        int numberOfThreads = 20;
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfThreads);
        CountDownLatch latch = new CountDownLatch(numberOfThreads);

        Long productId = p.getId();

        for (int i = 0; i < numberOfThreads; i++) {
            executorService.execute(() -> {
                try {
                    OrderRequest req = new OrderRequest();
                    req.setCustomerId("CUST-1");
                    OrderItemRequest item = new OrderItemRequest();
                    item.setProductId(productId);
                    item.setQuantity(1);
                    List<OrderItemRequest> items = new ArrayList<>();
                    items.add(item);
                    req.setItems(items);

                    restTemplate.postForEntity("/api/orders", req, Order.class);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();

        Product updatedProduct = productRepository.findById(productId).orElseThrow();
        assertEquals(0, updatedProduct.getAvailableQuantity(), "Available quantity should not fall below zero, and should process exactly 10 orders correctly.");

        long successfulOrders = orderRepository.findAll().stream()
                .filter(o -> o.getStatus() == OrderStatus.PENDING)
                .count();

        assertEquals(10, successfulOrders, "Exactly 10 orders should be created.");
    }

    @Test
    public void testInvalidStateTransition() {
        Product p = new Product("SKU-456", 10);
        p = productRepository.save(p);

        OrderRequest req = new OrderRequest();
        req.setCustomerId("CUST-1");
        OrderItemRequest item = new OrderItemRequest();
        item.setProductId(p.getId());
        item.setQuantity(1);
        List<OrderItemRequest> items = new ArrayList<>();
        items.add(item);
        req.setItems(items);

        ResponseEntity<Order> createResp = restTemplate.postForEntity("/api/orders", req, Order.class);
        assertEquals(HttpStatus.OK, createResp.getStatusCode());
        Long orderId = createResp.getBody().getId();

        // Ship once
        ResponseEntity<Order> shipResp1 = restTemplate.postForEntity("/api/orders/" + orderId + "/ship", null, Order.class);
        assertEquals(HttpStatus.OK, shipResp1.getStatusCode());

        // Ship twice - should fail
        ResponseEntity<String> shipResp2 = restTemplate.postForEntity("/api/orders/" + orderId + "/ship", null, String.class);
        assertEquals(HttpStatus.BAD_REQUEST, shipResp2.getStatusCode());
    }

    @Test
    public void testValidationFailureOnMalformedPayload() {
        OrderRequest req = new OrderRequest();
        // Missing customer ID and items
        ResponseEntity<String> resp = restTemplate.postForEntity("/api/orders", req, String.class);
        assertEquals(HttpStatus.BAD_REQUEST, resp.getStatusCode());
    }
}
