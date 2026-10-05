#include "../include/NetworkNode.hpp"

NetworkNode::NetworkNode() {}

std::string NetworkNode::processPacket(const std::vector<uint8_t>& packet) {
    ParsedCommand cmd = parser.parsePacket(packet);
    if (cmd.type == CommandType::SET) {
        storage.put(cmd.key, cmd.value);
        return "OK";
    } else if (cmd.type == CommandType::GET) {
        auto val = storage.get(cmd.key);
        return val ? *val : "NOT_FOUND";
    } else if (cmd.type == CommandType::DEL) {
        storage.del(cmd.key);
        return "OK";
    }
    return "ERROR";
}
