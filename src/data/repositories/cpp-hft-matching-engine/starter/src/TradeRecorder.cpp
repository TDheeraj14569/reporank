#include "../include/TradeRecorder.hpp"

TradeRecorder& TradeRecorder::getInstance() {
    static TradeRecorder instance;
    return instance;
}

void TradeRecorder::recordTrade(const Trade& trade) {
    std::lock_guard<std::mutex> lock(mu_);
    trades_.push_back(trade);
}

std::vector<Trade> TradeRecorder::getTrades() {
    std::lock_guard<std::mutex> lock(mu_);
    return trades_;
}

void TradeRecorder::clear() {
    std::lock_guard<std::mutex> lock(mu_);
    trades_.clear();
}
