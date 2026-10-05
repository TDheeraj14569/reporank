#pragma once
#include "OrderBook.hpp"
#include <vector>
#include <mutex>

class TradeRecorder {
public:
    static TradeRecorder& getInstance();
    void recordTrade(const Trade& trade);
    std::vector<Trade> getTrades();
    void clear();
private:
    TradeRecorder() = default;
    std::vector<Trade> trades_;
    std::mutex mu_;
};
