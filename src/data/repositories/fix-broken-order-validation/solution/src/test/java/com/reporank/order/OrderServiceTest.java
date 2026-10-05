package com.reporank.order;
import com.reporank.order.model.Order;
import com.reporank.order.model.OrderItem;
import com.reporank.order.model.OrderState;
import com.reporank.order.service.OrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.Collections;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class OrderServiceTest {
    @Autowired
    private OrderService orderService;

    @Test
    public void testCreateOrder_Valid() {
        Order order = new Order();
        order.setItems(List.of(new OrderItem("PROD-1", 2)));
        Order created = orderService.createOrder(order);
        assertNotNull(created.getId());
        assertEquals(OrderState.PENDING, created.getState());
    }

    @Test
    public void testCreateOrder_InvalidProduct() {
        Order order = new Order();
        order.setItems(List.of(new OrderItem("PROD-99", 1)));
        assertThrows(IllegalArgumentException.class, () -> orderService.createOrder(order));
    }

    @Test
    public void testCreateOrder_EmptyItems() {
        Order order = new Order();
        order.setItems(Collections.emptyList());
        assertThrows(IllegalArgumentException.class, () -> orderService.createOrder(order));
    }

    @Test
    public void testStateTransition_PendingToShipped() {
        Order order = new Order();
        order.setItems(List.of(new OrderItem("PROD-1", 2)));
        Order created = orderService.createOrder(order);
        Order updated = orderService.updateOrderState(created.getId(), OrderState.SHIPPED);
        assertEquals(OrderState.SHIPPED, updated.getState());
    }

    @Test
    public void testStateTransition_PendingToDelivered_Invalid() {
        Order order = new Order();
        order.setItems(List.of(new OrderItem("PROD-1", 2)));
        Order created = orderService.createOrder(order);
        assertThrows(IllegalArgumentException.class, () -> 
            orderService.updateOrderState(created.getId(), OrderState.DELIVERED)
        );
    }
}
