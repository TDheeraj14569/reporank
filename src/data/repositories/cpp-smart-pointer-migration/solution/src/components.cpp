#include "../include/components.hpp"

Node::Node(int val) : value(val), next(nullptr) {}

LinkedList::LinkedList() : head(nullptr) {}

void LinkedList::push(int val) {
    std::unique_ptr<Node> newNode = std::make_unique<Node>(val);
    newNode->next = std::move(head);
    head = std::move(newNode);
}

int LinkedList::pop() {
    if (!head) return -1;
    int val = head->value;
    head = std::move(head->next);
    return val;
}

bool LinkedList::isEmpty() const {
    return head == nullptr;
}
