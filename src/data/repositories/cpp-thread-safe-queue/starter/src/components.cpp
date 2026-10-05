#include "../include/components.hpp"

template <typename T>
void ThreadSafeQueue<T>::push(T value) {
    std::lock_guard<std::mutex> lock(mutex_);
    queue_.push(std::move(value));
    // Bug: using notify_all causes all waiting consumers to wake up.
    // With the 'if' check in pop, this guarantees a crash since only 
    // one consumer can safely dequeue the single item.
    cond_var_.notify_all();
}

template <typename T>
void ThreadSafeQueue<T>::pop(T& value) {
    std::unique_lock<std::mutex> lock(mutex_);
    // BUG: Using 'if' instead of 'while'. Susceptible to spurious wakeups
    // and race conditions when multiple threads are awakened.
    if (queue_.empty()) {
        cond_var_.wait(lock);
    }
    
    value = std::move(queue_.front());
    queue_.pop();
}

template <typename T>
bool ThreadSafeQueue<T>::empty() const {
    std::lock_guard<std::mutex> lock(mutex_);
    return queue_.empty();
}

template class ThreadSafeQueue<int>;
