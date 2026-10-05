package com.example.address.repository;

import com.example.address.model.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long> {
    List<Address> findByUserId(Long userId);
}
