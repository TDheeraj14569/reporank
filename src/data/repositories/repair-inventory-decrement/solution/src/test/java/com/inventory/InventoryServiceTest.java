package com.inventory;

import com.inventory.model.Inventory;
import com.inventory.repository.InventoryRepository;
import com.inventory.service.InventoryService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class InventoryServiceTest {

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private InventoryRepository inventoryRepository;

    @BeforeEach
    public void setup() {
        inventoryRepository.save(new Inventory(1L, 100));
    }

    @AfterEach
    public void cleanup() {
        inventoryRepository.deleteAll();
    }

    @Test
    public void testConcurrentDecrement() throws InterruptedException {
        int numberOfThreads = 100;
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfThreads);
        CountDownLatch latch = new CountDownLatch(numberOfThreads);
        AtomicInteger successCount = new AtomicInteger();

        for (int i = 0; i < numberOfThreads; i++) {
            executorService.execute(() -> {
                try {
                    boolean success = inventoryService.decrementInventory(1L, 2);
                    if (success) {
                        successCount.incrementAndGet();
                    }
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await(10, TimeUnit.SECONDS);
        executorService.shutdown();

        Inventory finalInventory = inventoryRepository.findById(1L).orElseThrow();
        
        // Assertions
        assertEquals(0, finalInventory.getStock(), "Stock should not be less than 0 or greater than 0");
        assertEquals(50, successCount.get(), "Exactly 50 decrements should succeed");
    }
}
