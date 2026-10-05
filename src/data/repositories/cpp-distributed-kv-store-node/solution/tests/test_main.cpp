#include "../include/NetworkNode.hpp"
#include "../include/ProtocolParser.hpp"
#include <iostream>
#include <cassert>
#include <vector>

void test_valid_set_get() {
    NetworkNode node;
    
    std::vector<uint8_t> set_pkt = {
        3, 'S', 'E', 'T',
        2, 0, 'k', '1',
        2, 0, 0, 0, 'v', '1'
    };
    
    assert(node.processPacket(set_pkt) == "OK");
    
    std::vector<uint8_t> get_pkt = {
        3, 'G', 'E', 'T',
        2, 0, 'k', '1'
    };
    
    assert(node.processPacket(get_pkt) == "v1");
}

void test_fragmented_packet_parsing() {
    ProtocolParser parser;
    
    std::vector<uint8_t> frag_pkt = {
        3, 'S', 'E'
    };
    
    ParsedCommand cmd = parser.parsePacket(frag_pkt);
    assert(cmd.type == CommandType::UNKNOWN);
}

int main() {
    test_valid_set_get();
    test_fragmented_packet_parsing();
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
