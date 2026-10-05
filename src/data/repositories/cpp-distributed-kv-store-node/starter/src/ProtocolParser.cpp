#include "../include/ProtocolParser.hpp"

ParsedCommand ProtocolParser::parsePacket(const std::vector<uint8_t>& packet) {
    if (packet.empty()) return {CommandType::UNKNOWN, "", ""};
    
    size_t offset = 0;
    uint8_t cmd_len = packet[offset++];
    
    // BUG: Missing bounds check can lead to out-of-bounds read
    std::string cmd_str(packet.begin() + offset, packet.begin() + offset + cmd_len);
    offset += cmd_len;
    
    CommandType type = CommandType::UNKNOWN;
    if (cmd_str == "GET") type = CommandType::GET;
    else if (cmd_str == "SET") type = CommandType::SET;
    else if (cmd_str == "DEL") type = CommandType::DEL;
    
    // BUG: Missing bounds check
    uint16_t key_len = packet[offset] | (packet[offset+1] << 8);
    offset += 2;
    
    std::string key(packet.begin() + offset, packet.begin() + offset + key_len);
    offset += key_len;
    
    std::string value;
    if (type == CommandType::SET) {
        // BUG: Missing bounds check
        uint32_t val_len = packet[offset] | (packet[offset+1] << 8) | (packet[offset+2] << 16) | (packet[offset+3] << 24);
        offset += 4;
        
        value = std::string(packet.begin() + offset, packet.begin() + offset + val_len);
    }
    
    return {type, key, value};
}
