#include "../include/components.hpp"
#include <thread>
#include <chrono>
#include <mutex>

Account::Account(int id, int balance) : id(id), balance(balance) {}

void transfer(Account& from, Account& to, int amount) {
    if (&from == &to) return;

    // Fix: Use std::scoped_lock to lock multiple mutexes without deadlocking
    std::scoped_lock lock(from.mtx, to.mtx);
    
    // Simulate some work
    std::this_thread::sleep_for(std::chrono::milliseconds(50));

    if (from.balance >= amount) {
        from.balance -= amount;
        to.balance += amount;
    }
}
