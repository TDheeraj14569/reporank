package com.example.address;

import com.example.address.model.Address;
import com.example.address.repository.AddressRepository;
import com.example.address.service.AddressService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AddressServiceTest {

    @Autowired
    private AddressService addressService;

    @Autowired
    private AddressRepository addressRepository;

    @BeforeEach
    public void setup() {
        addressRepository.deleteAll();
    }

    @Test
    public void testUpdateAddress_SetPrimary_ShouldNotAffectOtherUsers() {
        // Setup User A
        Address userA_Addr1 = new Address(1L, "123 Main St", "CityA", "StateA", "11111", true);
        Address userA_Addr2 = new Address(1L, "456 Side St", "CityA", "StateA", "22222", false);
        userA_Addr1 = addressRepository.save(userA_Addr1);
        userA_Addr2 = addressRepository.save(userA_Addr2);

        // Setup User B
        Address userB_Addr1 = new Address(2L, "789 Other St", "CityB", "StateB", "33333", true);
        userB_Addr1 = addressRepository.save(userB_Addr1);

        // Action: Update User A's second address to be primary
        Address updateData = new Address();
        updateData.setPrimary(true);
        addressService.updateAddress(userA_Addr2.getId(), updateData);

        // Assert User A's addresses
        Address updated_userA_Addr1 = addressRepository.findById(userA_Addr1.getId()).get();
        Address updated_userA_Addr2 = addressRepository.findById(userA_Addr2.getId()).get();
        
        assertFalse(updated_userA_Addr1.isPrimary(), "User A's old primary address should no longer be primary");
        assertTrue(updated_userA_Addr2.isPrimary(), "User A's new address should be primary");

        // Assert User B's addresses
        Address updated_userB_Addr1 = addressRepository.findById(userB_Addr1.getId()).get();
        assertTrue(updated_userB_Addr1.isPrimary(), "User B's primary address should NOT be affected by User A's update");
    }

    @Test
    public void testUpdateAddress_BasicFields() {
        Address addr = new Address(3L, "Old St", "OldCity", "OS", "00000", false);
        addr = addressRepository.save(addr);

        Address updateData = new Address();
        updateData.setStreet("New St");
        updateData.setCity("NewCity");
        
        Address updated = addressService.updateAddress(addr.getId(), updateData);
        
        assertEquals("New St", updated.getStreet());
        assertEquals("NewCity", updated.getCity());
        assertEquals("OS", updated.getState()); // Should remain unchanged
    }
}
