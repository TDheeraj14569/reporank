package com.inventory.service;

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
        // FIX: Use an atomic database update. If the stock is sufficient, exactly one
        // update will succeed and return 1.
        int updatedRows = inventoryRepository.decrementStock(productId, quantity);
        return updatedRows > 0;
    }
}
