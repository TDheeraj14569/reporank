#include "../include/WorkerThread.hpp"

WorkerThread::WorkerThread(JobQueue& queue) : m_queue(queue) {}

WorkerThread::~WorkerThread() {
    stop();
}

void WorkerThread::start() {
    m_running = true;
    m_thread = std::thread(&WorkerThread::loop, this);
}

void WorkerThread::stop() {
    if (m_running) {
        m_running = false;
        if (m_thread.joinable()) {
            m_thread.join();
        }
    }
}

void WorkerThread::loop() {
    while (m_running) {
        auto job = m_queue.wait_and_pop();
        if (job) {
            (*job)();
        } else {
            break;
        }
    }
}
