#ifndef COMPONENTS_HPP
#define COMPONENTS_HPP

#include <string>
#include <string_view>

class GreetingBuilder {
public:
    std::string_view buildGreeting(std::string_view name);
};

#endif // COMPONENTS_HPP
