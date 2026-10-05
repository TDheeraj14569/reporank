#include "../include/components.hpp"

ResourceManager::ResourceManager(size_t s) : size(s) {
    data = new int[size];
    for (size_t i = 0; i < size; ++i) {
        data[i] = 0;
    }
}

ResourceManager::~ResourceManager() {
    delete[] data;
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
