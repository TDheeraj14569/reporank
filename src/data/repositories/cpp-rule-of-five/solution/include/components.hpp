#pragma once
#include <cstddef>

class ResourceManager {
private:
    int* data;
    size_t size;

public:
    ResourceManager(size_t s);
    ~ResourceManager();

    // Copy Constructor
    ResourceManager(const ResourceManager& other);

    // Move Constructor
    ResourceManager(ResourceManager&& other) noexcept;

    // Copy Assignment
    ResourceManager& operator=(const ResourceManager& other);

    // Move Assignment
    ResourceManager& operator=(ResourceManager&& other) noexcept;

    void setValue(size_t index, int value);
    int getValue(size_t index) const;
};
