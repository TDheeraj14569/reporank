#pragma once

extern int component_destructor_called;
extern int ui_component_destructor_called;

class Component {
public:
    Component() {}
    
    // FIXED: Added virtual destructor
    virtual ~Component();
    
    virtual void render() = 0;
};

class UIComponent : public Component {
    int* data;
public:
    UIComponent();
    ~UIComponent();
    void render() override;
};
