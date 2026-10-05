#include "../include/TaskGraph.hpp"
#include <iostream>
#include <vector>
#include <mutex>
#include <thread>
#include <chrono>

int main() {
    TaskGraph graph(4);
    
    std::vector<int> execution_order;
    std::mutex mtx;

    auto t1 = graph.add_task(1, [&]() {
        std::this_thread::sleep_for(std::chrono::milliseconds(50));
        std::lock_guard<std::mutex> lock(mtx);
        execution_order.push_back(1);
    });

    auto t2 = graph.add_task(2, [&]() {
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
        std::lock_guard<std::mutex> lock(mtx);
        execution_order.push_back(2);
    });

    auto t3 = graph.add_task(3, [&]() {
        std::lock_guard<std::mutex> lock(mtx);
        execution_order.push_back(3);
    });

    // Dependencies: t1 must finish before t2, t2 must finish before t3
    // Expected order: 1, 2, 3
    graph.add_dependency(t1, t2);
    graph.add_dependency(t2, t3);

    graph.execute();
    graph.wait();

    bool correct = false;
    if (execution_order.size() == 3) {
        if (execution_order[0] == 1 && execution_order[1] == 2 && execution_order[2] == 3) {
            correct = true;
        }
    }

    if (correct) {
        std::cout << "SUCCESS: Tasks executed in topological order.\n";
        return 0;
    } else {
        std::cout << "FAILURE: Tasks did not execute in topological order.\n";
        for (int id : execution_order) {
            std::cout << id << " ";
        }
        std::cout << "\n";
        return 1;
    }
}
