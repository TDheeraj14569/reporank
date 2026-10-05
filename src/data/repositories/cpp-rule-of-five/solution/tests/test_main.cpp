#include "../include/components.hpp"
#include <vector>
#include <cassert>
#include <iostream>
#include <utility>

void test_copy_semantics() {
    ResourceManager res1(5);
    res1.setValue(0, 42);
    
    ResourceManager res2 = res1; // Uses correctly implemented copy constructor
    assert(res2.getValue(0) == 42);
    
    // Test assignment
    ResourceManager res3(2);
    res3 = res2;
    assert(res3.getValue(0) == 42);
}

void test_move_semantics() {
    ResourceManager res1(5);
    res1.setValue(0, 99);
    
    ResourceManager res2 = std::move(res1); // Uses correctly implemented move constructor
    assert(res2.getValue(0) == 99);
    
    ResourceManager res3(2);
    res3 = std::move(res2); // Uses correctly implemented move assignment
    assert(res3.getValue(0) == 99);
}

void test_vector_reallocation() {
    std::vector<ResourceManager> vec;
    // Push elements to force reallocation
    for (int i = 0; i < 5; ++i) {
        vec.push_back(ResourceManager(10));
    }
    // Reallocation happens correctly without double free thanks to the Rule of Five.
    assert(vec.size() == 5);
}

int main() {
    std::cout << "Testing Rule of Five..." << std::endl;
    
    test_copy_semantics();
    test_move_semantics();
    test_vector_reallocation();

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
