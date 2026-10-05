#pragma once

class Node {
public:
    int value;
    Node* next;
    Node(int val);
    ~Node();
};

class LinkedList {
private:
    Node* head;
public:
    LinkedList();
    ~LinkedList();

    void push(int val);
    int pop();
    bool isEmpty() const;
};
