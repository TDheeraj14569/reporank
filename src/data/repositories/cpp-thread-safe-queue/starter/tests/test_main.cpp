#include <iostream>
#include <thread>
#include <vector>
#include <cassert>
#include <atomic>
#include <chrono>
#include "../include/components.hpp"

int main() {
    ThreadSafeQueue<int> q;
    std::atomic<long long> sum_popped{0};
    std::atomic<long long> sum_pushed{0};
    
    int num_producers = 4;
    int num_consumers = 4;
    int items_per_producer = 2000;

    auto producer = [&](int id) {
        for (int i = 0; i < items_per_producer; ++i) {
            int val = id * items_per_producer + i + 1;
            q.push(val);
            sum_pushed += val;
        }
    };

    auto consumer = [&]() {
        for (int i = 0; i < items_per_producer; ++i) {
            int val = 0;
            q.pop(val);
            sum_popped += val;
        }
    };

    std::vector<std::thread> consumer_threads;
    std::vector<std::thread> producer_threads;
    
    // Start consumers first so they wait
    for (int i = 0; i < num_consumers; ++i) {
        consumer_threads.emplace_back(consumer);
    }
    
    // Give consumers a chance to start and block on empty queue
    std::this_thread::sleep_for(std::chrono::milliseconds(50));
    
    // Start producers
    for (int i = 0; i < num_producers; ++i) {
        producer_threads.emplace_back(producer, i);
    }

    for (auto& t : producer_threads) {
        t.join();
    }

    for (auto& t : consumer_threads) {
        t.join();
    }

    assert(q.empty() && "Queue should be empty after all consumers have finished.");
    assert(sum_pushed.load() == sum_popped.load() && "Sum of pushed items must equal sum of popped items.");

    std::cout << "All tests passed successfully!" << std::endl;
    return 0;
}
