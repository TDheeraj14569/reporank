#pragma once
#include <cstddef>

class ResourceManager {
private:
    int* data;
    size_t size;

public:
    ResourceManager(size_t s);
    ~ResourceManager();

    // Bug: Missing copy constructor, move constructor, copy assignment, move assignment.
    // The Rule of Five is violated here, which will cause a double-free on destruction
    // if copies or moves (which default to shallow copy) occur.
    
    void setValue(size_t index, int value);
    int getValue(size_t index) const;
};
