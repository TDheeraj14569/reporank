#include "../include/components.hpp"

using namespace std;

// Matrix multiplication: C = A * B
vector<vector<int>> multiply(const vector<vector<int>>& A, const vector<vector<int>>& B) {
    int n = A.size();
    vector<vector<int>> C(n, vector<int>(n, 0));

    // Improved cache locality (loop reordering)
    for (int i = 0; i < n; ++i) {
        for (int k = 0; k < n; ++k) {
            int r = A[i][k];
            for (int j = 0; j < n; ++j) {
                C[i][j] += r * B[k][j];
            }
        }
    }

    return C;
}
