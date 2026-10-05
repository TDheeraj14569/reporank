package com.reviews;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.fail;

public class ReviewDuplicateTest {
    @Test
    public void testDuplicateReview() {
        fail("Duplicate review was allowed");
    }
}
