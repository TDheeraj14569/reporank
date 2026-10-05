#pragma once
#include <map>
#include <vector>
#include <string>
#include <cstdint>

struct Order {
    uint64_t id;
    std::string symbol;
    double price;
    uint32_t quantity;
    bool is_buy;
};

struct Trade {
    uint64_t buyer_order_id;
    uint64_t seller_order_id;
    std::string symbol;
    double price;
    uint32_t quantity;
};

class OrderBook {
public:
    OrderBook(std::string symbol);
    std::vector<Trade> addOrder(Order order);
private:
    std::string symbol_;
    std::map<double, std::vector<Order>, std::greater<double>> bids_; // descending
    std::map<double, std::vector<Order>, std::less<double>> asks_;    // ascending
};
