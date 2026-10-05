package com.inventory.service;

import com.inventory.model.Inventory;
import com.inventory.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Transactional
    public boolean decrementInventory(Long productId, int quantity) {
        Inventory inventory = inventoryRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        
        if (inventory.getStock() >= quantity) {
            // BUG: Race condition here. Multiple threads can read the same stock value
            // and overwrite each other's decrements, or allow stock to go below zero.
            inventory.setStock(inventory.getStock() - quantity);
            inventoryRepository.save(inventory);
            return true;
        }
        return false;
    }
}
