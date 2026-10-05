#pragma once
#include <atomic>

extern std::atomic<int> shared_counter;

void increment_counter(int iterations);
