#include "../include/LSMTree.hpp"

void LSMTree::put(const std::string& key, const std::string& value) {
    std::lock_guard<std::mutex> lock(mtx);
    memtable[key] = value;
}

std::optional<std::string> LSMTree::get(const std::string& key) {
    std::lock_guard<std::mutex> lock(mtx);
    auto it = memtable.find(key);
    if (it != memtable.end()) {
        return it->second;
    }
    return std::nullopt;
}

void LSMTree::del(const std::string& key) {
    std::lock_guard<std::mutex> lock(mtx);
    memtable.erase(key);
}
