#pragma once
#include <mutex>

class Account {
public:
    int id;
    int balance;
    std::mutex mtx;

    Account(int id, int balance);
};

void transfer(Account& from, Account& to, int amount);
