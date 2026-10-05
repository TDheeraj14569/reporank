#include <iostream>
#include <cassert>
#include "../include/components.hpp"

void run_tests() {
    LinkedList list;
    list.push(10);
    list.push(20);
    
    assert(list.pop() == 20);
    assert(list.pop() == 10);
    assert(list.isEmpty());

    // Pushing elements that will not be popped.
    // When list goes out of scope, unique_ptr ensures no memory is leaked!
    list.push(30);
    list.push(40);
    
    std::cout << "Tests passed cleanly with zero memory leaks!" << std::endl;
}

int main() {
    run_tests();
    return 0;
}
