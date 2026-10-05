#include "../include/components.hpp"
#include <algorithm>

ResourceManager::ResourceManager(size_t s) : size(s) {
    data = new int[size];
    for (size_t i = 0; i < size; ++i) {
        data[i] = 0;
    }
}

ResourceManager::~ResourceManager() {
    delete[] data;
}

// Copy Constructor
ResourceManager::ResourceManager(const ResourceManager& other) : size(other.size) {
    data = new int[size];
    std::copy(other.data, other.data + size, data);
}

// Move Constructor
ResourceManager::ResourceManager(ResourceManager&& other) noexcept : data(other.data), size(other.size) {
    other.data = nullptr;
    other.size = 0;
}

// Copy Assignment
ResourceManager& ResourceManager::operator=(const ResourceManager& other) {
    if (this != &other) {
        delete[] data;
        size = other.size;
        data = new int[size];
        std::copy(other.data, other.data + size, data);
    }
    return *this;
}

// Move Assignment
ResourceManager& ResourceManager::operator=(ResourceManager&& other) noexcept {
    if (this != &other) {
        delete[] data;
        data = other.data;
        size = other.size;
        
        other.data = nullptr;
        other.size = 0;
    }
    return *this;
}

void ResourceManager::setValue(size_t index, int value) {
    if (index < size) {
        data[index] = value;
    }
}

int ResourceManager::getValue(size_t index) const {
    if (index < size) {
        return data[index];
    }
    return -1;
}
