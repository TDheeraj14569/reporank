package com.inventory.repository;

import com.inventory.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    
    @Modifying
    @Query("UPDATE Inventory i SET i.stock = i.stock - :quantity WHERE i.productId = :productId AND i.stock >= :quantity")
    int decrementStock(@Param("productId") Long productId, @Param("quantity") Integer quantity);
}
