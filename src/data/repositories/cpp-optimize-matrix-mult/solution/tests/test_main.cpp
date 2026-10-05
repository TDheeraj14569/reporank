#include <iostream>
#include <vector>
#include <cassert>
#include <chrono>
#include "../include/components.hpp"

using namespace std;

int main() {
    int n = 500;
    vector<vector<int>> A(n, vector<int>(n, 1));
    vector<vector<int>> B(n, vector<int>(n, 2));

    auto start = chrono::high_resolution_clock::now();
    vector<vector<int>> C = multiply(A, B);
    auto end = chrono::high_resolution_clock::now();

    chrono::duration<double> diff = end - start;
    cout << "Time taken: " << diff.count() << " seconds\n";

    // Verify result
    assert(C.size() == n && C[0].size() == n);
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            assert(C[i][j] == n * 1 * 2);
        }
    }
    
    cout << "All tests passed!\n";
    return 0;
}
