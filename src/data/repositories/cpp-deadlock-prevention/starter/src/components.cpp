#include "../include/components.hpp"
#include <thread>
#include <chrono>

Account::Account(int id, int balance) : id(id), balance(balance) {}

void transfer(Account& from, Account& to, int amount) {
    if (&from == &to) return;

    // TODO: Fix the lock ordering deadlock
    std::lock_guard<std::mutex> lock1(from.mtx);
    // Simulate some work to guarantee a deadlock if locks are acquired in reverse order
    std::this_thread::sleep_for(std::chrono::milliseconds(50));
    std::lock_guard<std::mutex> lock2(to.mtx);

    if (from.balance >= amount) {
        from.balance -= amount;
        to.balance += amount;
    }
}
