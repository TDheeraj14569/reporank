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
    // When list goes out of scope, these elements will leak because the destructor doesn't clean them up.
    list.push(30);
    list.push(40);
    
    std::cout << "Tests passed! (However, memory leaks exist due to raw pointers)" << std::endl;
}

int main() {
    run_tests();
    return 0;
}
