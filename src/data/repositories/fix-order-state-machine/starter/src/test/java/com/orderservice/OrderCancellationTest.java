package com.orderservice;

import com.orderservice.service.OrderService;
import com.orderservice.model.Order;
import com.orderservice.model.OrderStatus;
import com.orderservice.repository.OrderRepository;
import com.orderservice.exception.InvalidStateTransitionException;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;

public class OrderCancellationTest {
    @Test
    public void testCannotShipCancelledOrder() {
        OrderRepository repo = Mockito.mock(OrderRepository.class);
        Order order = new Order();
        order.setId("1");
        order.setStatus(OrderStatus.CANCELLED);
        Mockito.when(repo.findById("1")).thenReturn(Optional.of(order));
        
        OrderService service = new OrderService(repo);
        assertThrows(InvalidStateTransitionException.class, () -> {
            service.updateOrderStatus("1", OrderStatus.SHIPPED);
        });
    }
}
