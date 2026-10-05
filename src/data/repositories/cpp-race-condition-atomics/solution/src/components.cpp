#include "../include/components.hpp"

// Shared counter protected by std::atomic
std::atomic<int> shared_counter{0};

void increment_counter(int iterations) {
    for (int i = 0; i < iterations; ++i) {
        // Atomic increment, safe from data races
        shared_counter++;
    }
}
