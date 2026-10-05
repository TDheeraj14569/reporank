#include "../include/MatchingEngine.hpp"
#include "../include/TradeRecorder.hpp"
#include <iostream>

MatchingEngine::MatchingEngine() : running_(false) {}

MatchingEngine::~MatchingEngine() {
    stop();
}

void MatchingEngine::start() {
    running_ = true;
    worker_ = std::thread(&MatchingEngine::workerThread, this);
}

void MatchingEngine::stop() {
    running_ = false;
    cv_.notify_all();
    if (worker_.joinable()) {
        worker_.join();
    }
}

void MatchingEngine::submitOrder(const Order& order) {
    {
        std::lock_guard<std::mutex> lock(queue_mutex_);
        order_queue_.push(order);
    }
    cv_.notify_one();
}

void MatchingEngine::workerThread() {
    while (running_ || !order_queue_.empty()) {
        Order current_order;
        {
            std::unique_lock<std::mutex> lock(queue_mutex_);
            cv_.wait(lock, [this] { return !order_queue_.empty() || !running_; });
            
            if (order_queue_.empty() && !running_) break;
            if (order_queue_.empty()) continue;
            
            current_order = order_queue_.front();
            order_queue_.pop();
        }
        
        if (order_books_.find(current_order.symbol) == order_books_.end()) {
            order_books_.emplace(current_order.symbol, OrderBook(current_order.symbol));
        }
        
        auto trades = order_books_.at(current_order.symbol).addOrder(current_order);
        for (const auto& trade : trades) {
            TradeRecorder::getInstance().recordTrade(trade);
        }
    }
}
