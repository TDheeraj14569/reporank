#include "../include/ProtocolParser.hpp"

ParsedCommand ProtocolParser::parsePacket(const std::vector<uint8_t>& packet) {
    if (packet.empty()) return {CommandType::UNKNOWN, "", ""};
    
    size_t offset = 0;
    if (offset >= packet.size()) return {CommandType::UNKNOWN, "", ""};
    uint8_t cmd_len = packet[offset++];
    
    if (offset + cmd_len > packet.size()) return {CommandType::UNKNOWN, "", ""};
    std::string cmd_str(packet.begin() + offset, packet.begin() + offset + cmd_len);
    offset += cmd_len;
    
    CommandType type = CommandType::UNKNOWN;
    if (cmd_str == "GET") type = CommandType::GET;
    else if (cmd_str == "SET") type = CommandType::SET;
    else if (cmd_str == "DEL") type = CommandType::DEL;
    
    if (offset + 2 > packet.size()) return {type, "", ""};
    uint16_t key_len = packet[offset] | (packet[offset+1] << 8);
    offset += 2;
    
    if (offset + key_len > packet.size()) return {type, "", ""};
    std::string key(packet.begin() + offset, packet.begin() + offset + key_len);
    offset += key_len;
    
    std::string value;
    if (type == CommandType::SET) {
        if (offset + 4 > packet.size()) return {type, key, ""};
        uint32_t val_len = packet[offset] | (packet[offset+1] << 8) | (packet[offset+2] << 16) | (packet[offset+3] << 24);
        offset += 4;
        
        if (offset + val_len > packet.size()) return {type, key, ""};
        value = std::string(packet.begin() + offset, packet.begin() + offset + val_len);
    }
    
    return {type, key, value};
}
