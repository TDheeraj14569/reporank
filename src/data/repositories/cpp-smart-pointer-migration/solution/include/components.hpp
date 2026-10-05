#pragma once
#include <memory>

class Node {
public:
    int value;
    std::unique_ptr<Node> next;
    
    Node(int val);
    // With std::unique_ptr, the default destructor safely deletes the next node, 
    // automatically cleaning up the entire list recursively.
};

class LinkedList {
private:
    std::unique_ptr<Node> head;
public:
    LinkedList();

    // No need for a custom destructor, unique_ptr handles it!

    void push(int val);
    int pop();
    bool isEmpty() const;
};
