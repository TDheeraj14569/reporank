package com.hr;

import com.hr.service.LeaveService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class LeaveValidationTest {
    @Test
    public void testOverlappingLeave() {
        LeaveService service = new LeaveService();
        // In a real test, this would setup existing leaves and check overlap.
        // Assuming this test fails when it shouldn't allow overlap.
        boolean isValid = service.isValidLeave("2024-01-01", "2024-01-10");
        // We just force a failure for the simulation
        assertFalse(isValid, "Overlapping leave was allowed");
    }
}
