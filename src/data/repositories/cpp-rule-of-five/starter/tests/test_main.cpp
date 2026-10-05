#include "../include/components.hpp"
#include <vector>
#include <cassert>
#include <iostream>

void test_copy_semantics() {
    ResourceManager res1(5);
    res1.setValue(0, 42);
    
    ResourceManager res2 = res1; // Triggers shallow copy without Rule of Five
    assert(res2.getValue(0) == 42);
    
    // When res2 and res1 go out of scope, they will both attempt to delete the same memory.
    // This will cause a crash (double free) if the Rule of Five isn't correctly implemented.
}

void test_vector_reallocation() {
    std::vector<ResourceManager> vec;
    // Push elements to force reallocation
    for (int i = 0; i < 5; ++i) {
        vec.push_back(ResourceManager(10));
    }
    // Reallocation involves copying/moving elements. Without proper copy/move constructors,
    // memory will be double-freed when the old buffer is destroyed and again when the vector is destroyed.
    
    assert(vec.size() == 5);
}

int main() {
    std::cout << "Testing Rule of Five..." << std::endl;
    
    test_copy_semantics();
    test_vector_reallocation();

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
