#include "../include/components.hpp"

// Shared counter subject to a data race
int shared_counter = 0;

void increment_counter(int iterations) {
    for (int i = 0; i < iterations; ++i) {
        // Data race occurs here due to non-atomic read-modify-write
        shared_counter++;
    }
}
