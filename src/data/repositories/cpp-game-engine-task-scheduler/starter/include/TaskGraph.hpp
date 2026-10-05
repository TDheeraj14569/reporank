#pragma once
#include <vector>
#include <functional>
#include <memory>
#include <atomic>
#include <mutex>
#include "JobQueue.hpp"
#include "WorkerThread.hpp"

struct Task {
    int id;
    std::function<void()> work;
    std::vector<std::shared_ptr<Task>> dependents;
    std::atomic<int> dependencies_count{0};
};

class TaskGraph {
public:
    TaskGraph(size_t num_threads);
    ~TaskGraph();

    std::shared_ptr<Task> add_task(int id, std::function<void()> work);
    void add_dependency(std::shared_ptr<Task> before, std::shared_ptr<Task> after);

    void execute();
    void wait();

private:
    void finish_task(std::shared_ptr<Task> task);

    std::vector<std::shared_ptr<Task>> m_tasks;
    JobQueue m_queue;
    std::vector<std::unique_ptr<WorkerThread>> m_workers;
    
    std::atomic<int> m_tasks_remaining{0};
    std::mutex m_wait_mutex;
    std::condition_variable m_wait_cond;
};
