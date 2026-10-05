#pragma once
#include "OrderBook.hpp"
#include <string>
#include <unordered_map>
#include <thread>
#include <vector>
#include <mutex>
#include <condition_variable>
#include <queue>
#include <atomic>

class MatchingEngine {
public:
    MatchingEngine();
    ~MatchingEngine();
    
    void submitOrder(const Order& order);
    void start();
    void stop();

private:
    void workerThread();

    std::unordered_map<std::string, OrderBook> order_books_;
    std::queue<Order> order_queue_;
    std::mutex queue_mutex_;
    std::condition_variable cv_;
    std::atomic<bool> running_;
    std::thread worker_;
};
