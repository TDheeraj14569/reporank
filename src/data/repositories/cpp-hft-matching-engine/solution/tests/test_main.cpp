#include "../include/MatchingEngine.hpp"
#include "../include/TradeRecorder.hpp"
#include <iostream>
#include <thread>
#include <vector>
#include <cassert>

void test_matching_engine() {
    MatchingEngine engine;
    engine.start();
    
    TradeRecorder::getInstance().clear();
    
    std::vector<std::thread> threads;
    for (int i = 0; i < 1000; ++i) {
        threads.emplace_back([&engine, i]() {
            Order buy_order{static_cast<uint64_t>(i*2), "AAPL", 150.0, 10, true};
            Order sell_order{static_cast<uint64_t>(i*2+1), "AAPL", 150.0, 10, false};
            engine.submitOrder(buy_order);
            engine.submitOrder(sell_order);
        });
    }
    
    for (auto& t : threads) {
        t.join();
    }
    
    engine.stop();
    
    auto trades = TradeRecorder::getInstance().getTrades();
    std::cout << "Recorded trades: " << trades.size() << std::endl;
    assert(trades.size() == 1000);
    std::cout << "All tests passed!" << std::endl;
}

int main() {
    test_matching_engine();
    return 0;
}
