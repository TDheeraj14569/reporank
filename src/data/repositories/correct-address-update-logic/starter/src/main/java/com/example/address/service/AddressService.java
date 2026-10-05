package com.example.address.service;

import com.example.address.model.Address;
import com.example.address.repository.AddressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AddressService {
    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Transactional
    public Address updateAddress(Long id, Address updateData) {
        Address existing = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (updateData.getStreet() != null) existing.setStreet(updateData.getStreet());
        if (updateData.getCity() != null) existing.setCity(updateData.getCity());
        if (updateData.getState() != null) existing.setState(updateData.getState());
        if (updateData.getZipCode() != null) existing.setZipCode(updateData.getZipCode());
        
        if (updateData.isPrimary()) {
            existing.setPrimary(true);
            // BUG: clearing primary flag for all addresses in the system instead of just the user's!
            List<Address> allAddresses = (List<Address>) addressRepository.findAll();
            for (Address addr : allAddresses) {
                if (!addr.getId().equals(existing.getId())) {
                    addr.setPrimary(false);
                }
            }
            addressRepository.saveAll(allAddresses);
        } else {
            existing.setPrimary(false);
        }

        return addressRepository.save(existing);
    }
}
