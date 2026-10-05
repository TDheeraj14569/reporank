#include <iostream>
#include <thread>
#include <vector>
#include <cassert>
#include "../include/components.hpp"

int main() {
    const int num_threads = 10;
    const int iterations_per_thread = 100000;
    std::vector<std::thread> threads;

    for (int i = 0; i < num_threads; ++i) {
        threads.emplace_back(increment_counter, iterations_per_thread);
    }

    for (auto& t : threads) {
        t.join();
    }

    int expected = num_threads * iterations_per_thread;
    std::cout << "Expected count: " << expected << "\n";
    std::cout << "Actual count:   " << shared_counter << "\n";

    // The assert will likely fail because of the data race
    assert(shared_counter == expected && "Data race detected! Counter does not match expected value.");

    std::cout << "All tests passed successfully.\n";
    return 0;
}
