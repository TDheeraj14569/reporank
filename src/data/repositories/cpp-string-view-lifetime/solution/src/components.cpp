#include "../include/components.hpp"

// FIX: Return a std::string by value. 
// This ensures that the caller takes ownership of the constructed string,
// and no dangling references are created.
std::string GreetingBuilder::buildGreeting(std::string_view name) {
    std::string greeting = "Hello, " + std::string(name);
    return greeting;
}
