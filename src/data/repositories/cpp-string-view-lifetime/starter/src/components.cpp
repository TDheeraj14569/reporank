#include "../include/components.hpp"

// BUG: Returning a std::string_view to a local temporary string.
// The std::string is destroyed at the end of this function,
// leaving the string_view dangling.
std::string_view GreetingBuilder::buildGreeting(std::string_view name) {
    std::string greeting = "Hello, " + std::string(name);
    return greeting;
}
