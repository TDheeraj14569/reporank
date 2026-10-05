#include "../include/TaskGraph.hpp"

TaskGraph::TaskGraph(size_t num_threads) {
    for (size_t i = 0; i < num_threads; ++i) {
        m_workers.push_back(std::make_unique<WorkerThread>(m_queue));
        m_workers.back()->start();
    }
}

TaskGraph::~TaskGraph() {
    m_queue.stop();
    for (auto& worker : m_workers) {
        worker->stop();
    }
}

std::shared_ptr<Task> TaskGraph::add_task(int id, std::function<void()> work) {
    auto task = std::make_shared<Task>();
    task->id = id;
    task->work = std::move(work);
    task->dependencies_count = 0;
    m_tasks.push_back(task);
    return task;
}

void TaskGraph::add_dependency(std::shared_ptr<Task> before, std::shared_ptr<Task> after) {
    before->dependents.push_back(after);
    after->dependencies_count++;
}

void TaskGraph::execute() {
    m_tasks_remaining = m_tasks.size();
    
    for (auto& task : m_tasks) {
        // BUG: Enqueues all tasks immediately, ignoring dependencies completely!
        auto t = task;
        m_queue.push([this, t]() {
            t->work();
            finish_task(t);
        });
    }
}

void TaskGraph::finish_task(std::shared_ptr<Task> task) {
    if (--m_tasks_remaining == 0) {
        std::lock_guard<std::mutex> lock(m_wait_mutex);
        m_wait_cond.notify_all();
    }
}

void TaskGraph::wait() {
    std::unique_lock<std::mutex> lock(m_wait_mutex);
    m_wait_cond.wait(lock, [this]() { return m_tasks_remaining == 0; });
}
