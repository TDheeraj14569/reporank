#pragma once
#include <cstddef>
#include <cstdint>
#include <new>

struct Player {
    int id;
    float health;
    float position[3];
};

class MemoryPool {
private:
    size_t chunkSize;
    size_t numChunks;
    void* pool;
    void* freeList;

public:
    MemoryPool(size_t chunk_size, size_t num_chunks);
    ~MemoryPool();
    void* allocate();
    void deallocate(void* ptr);

    // Prevent copy
    MemoryPool(const MemoryPool&) = delete;
    MemoryPool& operator=(const MemoryPool&) = delete;
};
