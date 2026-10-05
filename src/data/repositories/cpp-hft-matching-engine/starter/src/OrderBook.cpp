#include "../include/OrderBook.hpp"
#include <algorithm>

OrderBook::OrderBook(std::string symbol) : symbol_(std::move(symbol)) {}

std::vector<Trade> OrderBook::addOrder(Order order) {
    std::vector<Trade> trades;
    
    if (order.is_buy) {
        while (order.quantity > 0 && !asks_.empty()) {
            auto best_ask_it = asks_.begin();
            if (order.price >= best_ask_it->first) {
                auto& ask_orders = best_ask_it->second;
                auto& best_ask_order = ask_orders.front();
                
                uint32_t traded_qty = std::min(order.quantity, best_ask_order.quantity);
                trades.push_back({order.id, best_ask_order.id, symbol_, best_ask_it->first, traded_qty});
                
                order.quantity -= traded_qty;
                best_ask_order.quantity -= traded_qty;
                
                if (best_ask_order.quantity == 0) {
                    ask_orders.erase(ask_orders.begin());
                    if (ask_orders.empty()) {
                        asks_.erase(best_ask_it);
                    }
                }
            } else {
                break;
            }
        }
        if (order.quantity > 0) {
            bids_[order.price].push_back(order);
        }
    } else {
        while (order.quantity > 0 && !bids_.empty()) {
            auto best_bid_it = bids_.begin();
            if (order.price <= best_bid_it->first) {
                auto& bid_orders = best_bid_it->second;
                auto& best_bid_order = bid_orders.front();
                
                uint32_t traded_qty = std::min(order.quantity, best_bid_order.quantity);
                trades.push_back({best_bid_order.id, order.id, symbol_, best_bid_it->first, traded_qty});
                
                order.quantity -= traded_qty;
                best_bid_order.quantity -= traded_qty;
                
                if (best_bid_order.quantity == 0) {
                    bid_orders.erase(bid_orders.begin());
                    if (bid_orders.empty()) {
                        bids_.erase(best_bid_it);
                    }
                }
            } else {
                break;
            }
        }
        if (order.quantity > 0) {
            asks_[order.price].push_back(order);
        }
    }
    
    return trades;
}
