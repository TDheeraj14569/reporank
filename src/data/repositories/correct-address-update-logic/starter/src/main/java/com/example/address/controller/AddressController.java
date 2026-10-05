package com.example.address.controller;

import com.example.address.model.Address;
import com.example.address.service.AddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address address) {
        try {
            return ResponseEntity.ok(addressService.updateAddress(id, address));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
