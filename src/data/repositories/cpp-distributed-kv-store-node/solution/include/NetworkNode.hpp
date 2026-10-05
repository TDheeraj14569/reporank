#pragma once
#include "ProtocolParser.hpp"
#include "LSMTree.hpp"
#include <vector>
#include <cstdint>

class NetworkNode {
public:
    NetworkNode();
    std::string processPacket(const std::vector<uint8_t>& packet);

private:
    ProtocolParser parser;
    LSMTree storage;
};
