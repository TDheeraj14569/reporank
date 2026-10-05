#include <iostream>
#include <cassert>
#include "../include/components.hpp"

void runTests() {
    GreetingBuilder builder;
    std::string_view result = builder.buildGreeting("Alice");
    
    // At this point, 'result' is pointing to memory that has been freed.
    // We allocate another string here to deliberately overwrite the stack 
    // memory that the dangling string_view is pointing to.
    std::string overwrite = "This will overwrite the vacated stack memory completely with new data!";
    
    // This assertion will fail because 'result' is dangling and corrupted.
    assert(result == "Hello, Alice");
}

int main() {
    runTests();
    std::cout << "All tests passed!\n";
    return 0;
}
