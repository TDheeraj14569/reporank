#include "components.hpp"

int component_destructor_called = 0;
int ui_component_destructor_called = 0;

Component::~Component() {
    component_destructor_called++;
}

UIComponent::UIComponent() {
    data = new int[100];
}

UIComponent::~UIComponent() {
    delete[] data;
    ui_component_destructor_called++;
}

void UIComponent::render() {
    // Render UI
}
