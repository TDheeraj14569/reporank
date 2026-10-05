#include "../include/JobQueue.hpp"

void JobQueue::push(std::function<void()> item) {
    std::lock_guard<std::mutex> lock(m_mutex);
    m_queue.push(std::move(item));
    m_cond.notify_one();
}

std::optional<std::function<void()>> JobQueue::pop() {
    std::unique_lock<std::mutex> lock(m_mutex);
    if (m_queue.empty()) return std::nullopt;
    auto item = std::move(m_queue.front());
    m_queue.pop();
    return item;
}

std::optional<std::function<void()>> JobQueue::wait_and_pop() {
    std::unique_lock<std::mutex> lock(m_mutex);
    m_cond.wait(lock, [this] { return !m_queue.empty() || m_stop; });
    if (m_queue.empty() && m_stop) return std::nullopt;
    auto item = std::move(m_queue.front());
    m_queue.pop();
    return item;
}

void JobQueue::stop() {
    std::lock_guard<std::mutex> lock(m_mutex);
    m_stop = true;
    m_cond.notify_all();
}
