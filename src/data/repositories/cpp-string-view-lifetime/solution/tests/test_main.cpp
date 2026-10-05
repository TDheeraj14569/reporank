#include <iostream>
#include <cassert>
#include "../include/components.hpp"

void runTests() {
    GreetingBuilder builder;
    std::string result = builder.buildGreeting("Alice");
    
    // Even if we allocate more data on the stack/heap, 'result' safely owns its data.
    std::string overwrite = "This will overwrite the vacated stack memory completely with new data!";
    
    // This assertion will now pass reliably.
    assert(result == "Hello, Alice");
}

int main() {
    runTests();
    std::cout << "All tests passed!\n";
    return 0;
}
