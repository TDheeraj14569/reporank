package com.inventory.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    private Long productId;
    private Integer stock;

    public Inventory() {}

    public Inventory(Long productId, Integer stock) {
        this.productId = productId;
        this.stock = stock;
    }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}
