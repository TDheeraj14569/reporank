#include "../include/components.hpp"

Node::Node(int val) : value(val), next(nullptr) {}
Node::~Node() {
    // Raw pointer bug: If not manually deleted, this will cause memory leaks.
}

LinkedList::LinkedList() : head(nullptr) {}

LinkedList::~LinkedList() {
    // Missing manual deletion of nodes, causing a memory leak!
    // A modern C++ approach would avoid manual memory management using std::unique_ptr.
}

void LinkedList::push(int val) {
    Node* newNode = new Node(val);
    newNode->next = head;
    head = newNode;
}

int LinkedList::pop() {
    if (!head) return -1;
    int val = head->value;
    Node* temp = head;
    head = head->next;
    delete temp;
    return val;
}

bool LinkedList::isEmpty() const {
    return head == nullptr;
}
