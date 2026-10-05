#include "../include/components.hpp"
#include <iostream>
#include <thread>
#include <cassert>

void run_test() {
    Account acc1(1, 1000);
    Account acc2(2, 1000);

    // Concurrent transfers in opposite directions
    std::thread t1(transfer, std::ref(acc1), std::ref(acc2), 100);
    std::thread t2(transfer, std::ref(acc2), std::ref(acc1), 200);

    t1.join();
    t2.join();

    assert(acc1.balance == 1100);
    assert(acc2.balance == 900);
    std::cout << "Test passed: No deadlock detected." << std::endl;
}

int main() {
    std::cout << "Starting test..." << std::endl;
    run_test();
    return 0;
}
