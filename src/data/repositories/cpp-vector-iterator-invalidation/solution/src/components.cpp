#include "../include/components.hpp"

// This function processes a vector of integers.
// For every negative number found, it appends a 0 to the end of the vector.
void processAndAdd(std::vector<int>& data) {
    // FIX: Cache the original size and use index-based access.
    // This avoids iterator invalidation if the vector reallocates when we call push_back.
    // It also prevents an infinite loop or bounds issues from newly added elements.
    size_t original_size = data.size();
    for (size_t i = 0; i < original_size; ++i) {
        if (data[i] < 0) {
            data.push_back(0);
        }
    }
}
