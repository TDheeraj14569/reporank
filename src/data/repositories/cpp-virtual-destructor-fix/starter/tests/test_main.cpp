#include <iostream>
#include <vector>
#include <cassert>
#include "../include/components.hpp"

void run_test() {
    component_destructor_called = 0;
    ui_component_destructor_called = 0;

    {
        std::vector<Component*> components;
        components.push_back(new UIComponent());
        components.push_back(new UIComponent());
        
        for (auto comp : components) {
            delete comp;
        }
    }

    assert(component_destructor_called == 2);
    assert(ui_component_destructor_called == 2 && "UIComponent destructor was not called! Memory leak detected.");
    std::cout << "Test passed: All destructors were called correctly." << std::endl;
}

int main() {
    std::cout << "Starting test..." << std::endl;
    run_test();
    return 0;
}
