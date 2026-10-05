package com.inventory.controller;

import com.inventory.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/{productId}/decrement")
    public ResponseEntity<String> decrement(@PathVariable Long productId, @RequestParam int quantity) {
        try {
            boolean success = inventoryService.decrementInventory(productId, quantity);
            if (success) {
                return ResponseEntity.ok("Inventory decremented successfully");
            } else {
                return ResponseEntity.badRequest().body("Insufficient stock");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
