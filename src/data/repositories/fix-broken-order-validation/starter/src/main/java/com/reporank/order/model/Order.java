package com.reporank.order.model;
import jakarta.persistence.*;
import java.util.List;
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;
    @Enumerated(EnumType.STRING)
    private OrderState state;
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
    public OrderState getState() { return state; }
    public void setState(OrderState state) { this.state = state; }
}
