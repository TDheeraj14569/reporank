#include "../include/components.hpp"

MemoryPool::MemoryPool(size_t chunk_size, size_t num_chunks) : numChunks(num_chunks) {
    // Ensure chunk size is at least sizeof(void*) and properly aligned
    size_t align = alignof(std::max_align_t);
    this->chunkSize = (chunk_size + align - 1) & ~(align - 1);
    if (this->chunkSize < sizeof(void*)) {
        this->chunkSize = sizeof(void*);
    }
    
    pool = ::operator new(this->chunkSize * this->numChunks);
    freeList = pool;

    void** current = static_cast<void**>(pool);
    for (size_t i = 0; i < numChunks - 1; ++i) {
        // Calculate the next chunk's address
        void** next = current + this->chunkSize; 
        
        *current = next;
        current = next;
    }
    *current = nullptr;
}

MemoryPool::~MemoryPool() {
    ::operator delete(pool);
}

void* MemoryPool::allocate() {
    if (!freeList) return nullptr;
    void* ptr = freeList;
    freeList = *static_cast<void**>(freeList);
    return ptr;
}

void MemoryPool::deallocate(void* ptr) {
    if (!ptr) return;
    *static_cast<void**>(ptr) = freeList;
    freeList = ptr;
}
