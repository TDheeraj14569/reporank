#include <iostream>
#include <vector>
#include <cassert>
#include "../include/components.hpp"

int main() {
    std::vector<int> data;
    // Pre-fill to cause reallocation on the first push_back.
    data.reserve(10);
    for (int i = 0; i < 10; ++i) {
        data.push_back(i % 2 == 0 ? -1 : 1);
    }
    
    // Process the data
    processAndAdd(data);
    
    // Check results
    int zero_count = 0;
    for (int x : data) {
        if (x == 0) zero_count++;
    }
    
    assert(zero_count == 5);
    assert(data.size() == 15);
    
    std::cout << "All tests passed.\n";
    return 0;
}
