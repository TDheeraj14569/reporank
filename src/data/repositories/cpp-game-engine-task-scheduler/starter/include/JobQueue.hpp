#pragma once
#include <queue>
#include <mutex>
#include <condition_variable>
#include <functional>
#include <optional>

class JobQueue {
public:
    void push(std::function<void()> item);
    std::optional<std::function<void()>> pop();
    std::optional<std::function<void()>> wait_and_pop();
    void stop();

private:
    std::queue<std::function<void()>> m_queue;
    std::mutex m_mutex;
    std::condition_variable m_cond;
    bool m_stop = false;
};
