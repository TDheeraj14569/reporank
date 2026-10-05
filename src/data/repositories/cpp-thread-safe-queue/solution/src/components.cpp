#include "../include/components.hpp"

template <typename T>
void ThreadSafeQueue<T>::push(T value) {
    std::lock_guard<std::mutex> lock(mutex_);
    queue_.push(std::move(value));
    cond_var_.notify_one();
}

template <typename T>
void ThreadSafeQueue<T>::pop(T& value) {
    std::unique_lock<std::mutex> lock(mutex_);
    // FIX: Use a condition variable wait with a predicate lambda 
    // which correctly handles spurious wakeups and wait conditions.
    cond_var_.wait(lock, [this] { return !queue_.empty(); });
    
    value = std::move(queue_.front());
    queue_.pop();
}

template <typename T>
bool ThreadSafeQueue<T>::empty() const {
    std::lock_guard<std::mutex> lock(mutex_);
    return queue_.empty();
}

template class ThreadSafeQueue<int>;
