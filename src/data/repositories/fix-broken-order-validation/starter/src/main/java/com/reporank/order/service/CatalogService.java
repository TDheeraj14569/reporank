package com.reporank.order.service;
import org.springframework.stereotype.Service;
import java.util.Set;
@Service
public class CatalogService {
    private final Set<String> validProducts = Set.of("PROD-1", "PROD-2", "PROD-3");
    public boolean isProductValid(String productId) {
        return validProducts.contains(productId);
    }
}
