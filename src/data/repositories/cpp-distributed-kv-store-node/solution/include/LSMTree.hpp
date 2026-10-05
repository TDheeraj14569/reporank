#pragma once
#include <string>
#include <map>
#include <mutex>
#include <optional>

class LSMTree {
public:
    void put(const std::string& key, const std::string& value);
    std::optional<std::string> get(const std::string& key);
    void del(const std::string& key);

private:
    std::map<std::string, std::string> memtable;
    std::mutex mtx;
};
