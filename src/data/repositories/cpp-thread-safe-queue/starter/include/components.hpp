#ifndef COMPONENTS_HPP
#define COMPONENTS_HPP

#include <queue>
#include <mutex>
#include <condition_variable>

template <typename T>
class ThreadSafeQueue {
private:
    std::queue<T> queue_;
    mutable std::mutex mutex_;
    std::condition_variable cond_var_;

public:
    ThreadSafeQueue() = default;

    void push(T value);
    void pop(T& value);
    bool empty() const;
};

#endif // COMPONENTS_HPP
