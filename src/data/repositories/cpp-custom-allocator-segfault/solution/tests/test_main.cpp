#include "../include/components.hpp"
#include <iostream>
#include <cassert>
#include <vector>

int main() {
    std::cout << "Initializing Memory Pool..." << std::endl;
    // Pool for 1000 Player objects
    MemoryPool pool(sizeof(Player), 1000);

    std::cout << "Allocating objects..." << std::endl;
    std::vector<Player*> players;
    for (int i = 0; i < 500; ++i) {
        Player* p = static_cast<Player*>(pool.allocate());
        assert(p != nullptr);
        p->id = i;
        p->health = 100.0f;
        players.push_back(p);
    }

    std::cout << "Verifying data..." << std::endl;
    for (int i = 0; i < 500; ++i) {
        assert(players[i]->id == i);
        assert(players[i]->health == 100.0f);
    }

    std::cout << "Deallocating objects..." << std::endl;
    for (Player* p : players) {
        pool.deallocate(p);
    }

    std::cout << "All tests passed successfully!" << std::endl;
    return 0;
}
