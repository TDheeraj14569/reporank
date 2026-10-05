#pragma once
#include <string>
#include <vector>
#include <cstdint>

enum class CommandType {
    GET,
    SET,
    DEL,
    UNKNOWN
};

struct ParsedCommand {
    CommandType type;
    std::string key;
    std::string value;
};

class ProtocolParser {
public:
    ParsedCommand parsePacket(const std::vector<uint8_t>& packet);
};
