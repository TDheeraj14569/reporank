#include "../include/components.hpp"

// This function processes a vector of integers.
// For every negative number found, it appends a 0 to the end of the vector.
void processAndAdd(std::vector<int>& data) {
    auto end = data.end();
    for (auto it = data.begin(); it != end; ++it) {
        if (*it < 0) {
            data.push_back(0); // BUG: push_back can reallocate memory and invalidate iterators.
        }
    }
}
