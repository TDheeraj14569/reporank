package com.reporank.order.model;
import jakarta.persistence.*;
@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productId;
    private int quantity;
    public OrderItem() {}
    public OrderItem(String productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
