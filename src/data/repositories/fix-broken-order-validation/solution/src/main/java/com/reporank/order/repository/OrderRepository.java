package com.reporank.order.repository;
import com.reporank.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
public interface OrderRepository extends JpaRepository<Order, Long> {
}
