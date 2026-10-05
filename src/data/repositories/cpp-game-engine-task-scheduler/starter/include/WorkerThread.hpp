#pragma once
#include <thread>
#include <atomic>
#include "JobQueue.hpp"

class WorkerThread {
public:
    WorkerThread(JobQueue& queue);
    ~WorkerThread();

    void start();
    void stop();

private:
    void loop();

    JobQueue& m_queue;
    std::thread m_thread;
    std::atomic<bool> m_running{false};
};
