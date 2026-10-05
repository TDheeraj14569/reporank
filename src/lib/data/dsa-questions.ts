/* eslint-disable */
export interface DSAQuestionData {
  id: number;
  slug: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: { input: string; output: string; explanation: string }[];
  tags: string[];
  starterCode: { language: string; code: string }[];
  acceptance: number;
}

export const dsaQuestions: DSAQuestionData[] = [
  {
    "id": 1,
    "slug": "two-sum",
    "title": "Two Sum",
    "difficulty": "easy",
    "category": "Arrays",
    "description": "Given the necessary inputs for Two Sum, return the correct output.",
    "problemStatement": "This is a classic problem known as Two Sum. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Two Sum",
    "outputFormat": "Standard output as required by Two Sum",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "arrays",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 73
  },
  {
    "id": 2,
    "slug": "best-time-to-buy-sell-stock",
    "title": "Best Time to Buy/Sell Stock",
    "difficulty": "easy",
    "category": "Arrays",
    "description": "Given the necessary inputs for Best Time to Buy/Sell Stock, return the correct output.",
    "problemStatement": "This is a classic problem known as Best Time to Buy/Sell Stock. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Best Time to Buy/Sell Stock",
    "outputFormat": "Standard output as required by Best Time to Buy/Sell Stock",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "arrays",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 82
  },
  {
    "id": 3,
    "slug": "contains-duplicate",
    "title": "Contains Duplicate",
    "difficulty": "easy",
    "category": "Arrays",
    "description": "Given the necessary inputs for Contains Duplicate, return the correct output.",
    "problemStatement": "This is a classic problem known as Contains Duplicate. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Contains Duplicate",
    "outputFormat": "Standard output as required by Contains Duplicate",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "arrays",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 70
  },
  {
    "id": 4,
    "slug": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "medium",
    "category": "Arrays",
    "description": "Given the necessary inputs for Product of Array Except Self, return the correct output.",
    "problemStatement": "This is a classic problem known as Product of Array Except Self. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Product of Array Except Self",
    "outputFormat": "Standard output as required by Product of Array Except Self",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "arrays",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 51
  },
  {
    "id": 5,
    "slug": "maximum-subarray",
    "title": "Maximum Subarray",
    "difficulty": "medium",
    "category": "Arrays",
    "description": "Given the necessary inputs for Maximum Subarray, return the correct output.",
    "problemStatement": "This is a classic problem known as Maximum Subarray. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Maximum Subarray",
    "outputFormat": "Standard output as required by Maximum Subarray",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "arrays",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 66
  },
  {
    "id": 6,
    "slug": "merge-intervals",
    "title": "Merge Intervals",
    "difficulty": "medium",
    "category": "Arrays",
    "description": "Given the necessary inputs for Merge Intervals, return the correct output.",
    "problemStatement": "This is a classic problem known as Merge Intervals. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Merge Intervals",
    "outputFormat": "Standard output as required by Merge Intervals",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "arrays",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 67
  },
  {
    "id": 7,
    "slug": "3sum",
    "title": "3Sum",
    "difficulty": "medium",
    "category": "Arrays",
    "description": "Given the necessary inputs for 3Sum, return the correct output.",
    "problemStatement": "This is a classic problem known as 3Sum. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by 3Sum",
    "outputFormat": "Standard output as required by 3Sum",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "arrays",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 61
  },
  {
    "id": 8,
    "slug": "container-with-most-water",
    "title": "Container With Most Water",
    "difficulty": "medium",
    "category": "Arrays",
    "description": "Given the necessary inputs for Container With Most Water, return the correct output.",
    "problemStatement": "This is a classic problem known as Container With Most Water. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Container With Most Water",
    "outputFormat": "Standard output as required by Container With Most Water",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "arrays",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 62
  },
  {
    "id": 9,
    "slug": "valid-anagram",
    "title": "Valid Anagram",
    "difficulty": "easy",
    "category": "Strings",
    "description": "Given the necessary inputs for Valid Anagram, return the correct output.",
    "problemStatement": "This is a classic problem known as Valid Anagram. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Valid Anagram",
    "outputFormat": "Standard output as required by Valid Anagram",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "strings",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 83
  },
  {
    "id": 10,
    "slug": "longest-substring-without-repeating",
    "title": "Longest Substring Without Repeating",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Given the necessary inputs for Longest Substring Without Repeating, return the correct output.",
    "problemStatement": "This is a classic problem known as Longest Substring Without Repeating. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Longest Substring Without Repeating",
    "outputFormat": "Standard output as required by Longest Substring Without Repeating",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "strings",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 61
  },
  {
    "id": 11,
    "slug": "valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "easy",
    "category": "Strings",
    "description": "Given the necessary inputs for Valid Parentheses, return the correct output.",
    "problemStatement": "This is a classic problem known as Valid Parentheses. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Valid Parentheses",
    "outputFormat": "Standard output as required by Valid Parentheses",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "strings",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 73
  },
  {
    "id": 12,
    "slug": "longest-palindromic-substring",
    "title": "Longest Palindromic Substring",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Given the necessary inputs for Longest Palindromic Substring, return the correct output.",
    "problemStatement": "This is a classic problem known as Longest Palindromic Substring. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Longest Palindromic Substring",
    "outputFormat": "Standard output as required by Longest Palindromic Substring",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "strings",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 61
  },
  {
    "id": 13,
    "slug": "group-anagrams",
    "title": "Group Anagrams",
    "difficulty": "medium",
    "category": "Strings",
    "description": "Given the necessary inputs for Group Anagrams, return the correct output.",
    "problemStatement": "This is a classic problem known as Group Anagrams. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Group Anagrams",
    "outputFormat": "Standard output as required by Group Anagrams",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "strings",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 52
  },
  {
    "id": 14,
    "slug": "minimum-window-substring",
    "title": "Minimum Window Substring",
    "difficulty": "hard",
    "category": "Strings",
    "description": "Given the necessary inputs for Minimum Window Substring, return the correct output.",
    "problemStatement": "This is a classic problem known as Minimum Window Substring. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Minimum Window Substring",
    "outputFormat": "Standard output as required by Minimum Window Substring",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "strings",
      "hard"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 43
  },
  {
    "id": 15,
    "slug": "reverse-linked-list",
    "title": "Reverse Linked List",
    "difficulty": "easy",
    "category": "Linked Lists",
    "description": "Given the necessary inputs for Reverse Linked List, return the correct output.",
    "problemStatement": "This is a classic problem known as Reverse Linked List. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Reverse Linked List",
    "outputFormat": "Standard output as required by Reverse Linked List",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "linked lists",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 83
  },
  {
    "id": 16,
    "slug": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "easy",
    "category": "Linked Lists",
    "description": "Given the necessary inputs for Merge Two Sorted Lists, return the correct output.",
    "problemStatement": "This is a classic problem known as Merge Two Sorted Lists. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Merge Two Sorted Lists",
    "outputFormat": "Standard output as required by Merge Two Sorted Lists",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "linked lists",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 71
  },
  {
    "id": 17,
    "slug": "linked-list-cycle",
    "title": "Linked List Cycle",
    "difficulty": "easy",
    "category": "Linked Lists",
    "description": "Given the necessary inputs for Linked List Cycle, return the correct output.",
    "problemStatement": "This is a classic problem known as Linked List Cycle. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Linked List Cycle",
    "outputFormat": "Standard output as required by Linked List Cycle",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "linked lists",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 81
  },
  {
    "id": 18,
    "slug": "remove-nth-node-from-end",
    "title": "Remove Nth Node From End",
    "difficulty": "medium",
    "category": "Linked Lists",
    "description": "Given the necessary inputs for Remove Nth Node From End, return the correct output.",
    "problemStatement": "This is a classic problem known as Remove Nth Node From End. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Remove Nth Node From End",
    "outputFormat": "Standard output as required by Remove Nth Node From End",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "linked lists",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 65
  },
  {
    "id": 19,
    "slug": "maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "easy",
    "category": "Trees",
    "description": "Given the necessary inputs for Maximum Depth of Binary Tree, return the correct output.",
    "problemStatement": "This is a classic problem known as Maximum Depth of Binary Tree. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Maximum Depth of Binary Tree",
    "outputFormat": "Standard output as required by Maximum Depth of Binary Tree",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "trees",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 79
  },
  {
    "id": 20,
    "slug": "validate-bst",
    "title": "Validate BST",
    "difficulty": "medium",
    "category": "Trees",
    "description": "Given the necessary inputs for Validate BST, return the correct output.",
    "problemStatement": "This is a classic problem known as Validate BST. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Validate BST",
    "outputFormat": "Standard output as required by Validate BST",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "trees",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 65
  },
  {
    "id": 21,
    "slug": "level-order-traversal",
    "title": "Level Order Traversal",
    "difficulty": "medium",
    "category": "Trees",
    "description": "Given the necessary inputs for Level Order Traversal, return the correct output.",
    "problemStatement": "This is a classic problem known as Level Order Traversal. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Level Order Traversal",
    "outputFormat": "Standard output as required by Level Order Traversal",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "trees",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 59
  },
  {
    "id": 22,
    "slug": "lowest-common-ancestor",
    "title": "Lowest Common Ancestor",
    "difficulty": "medium",
    "category": "Trees",
    "description": "Given the necessary inputs for Lowest Common Ancestor, return the correct output.",
    "problemStatement": "This is a classic problem known as Lowest Common Ancestor. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Lowest Common Ancestor",
    "outputFormat": "Standard output as required by Lowest Common Ancestor",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "trees",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 65
  },
  {
    "id": 23,
    "slug": "serialize-deserialize",
    "title": "Serialize/Deserialize",
    "difficulty": "hard",
    "category": "Trees",
    "description": "Given the necessary inputs for Serialize/Deserialize, return the correct output.",
    "problemStatement": "This is a classic problem known as Serialize/Deserialize. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Serialize/Deserialize",
    "outputFormat": "Standard output as required by Serialize/Deserialize",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "trees",
      "hard"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 41
  },
  {
    "id": 24,
    "slug": "number-of-islands",
    "title": "Number of Islands",
    "difficulty": "medium",
    "category": "Graphs",
    "description": "Given the necessary inputs for Number of Islands, return the correct output.",
    "problemStatement": "This is a classic problem known as Number of Islands. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Number of Islands",
    "outputFormat": "Standard output as required by Number of Islands",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "graphs",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 61
  },
  {
    "id": 25,
    "slug": "clone-graph",
    "title": "Clone Graph",
    "difficulty": "medium",
    "category": "Graphs",
    "description": "Given the necessary inputs for Clone Graph, return the correct output.",
    "problemStatement": "This is a classic problem known as Clone Graph. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Clone Graph",
    "outputFormat": "Standard output as required by Clone Graph",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "graphs",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 69
  },
  {
    "id": 26,
    "slug": "course-schedule",
    "title": "Course Schedule",
    "difficulty": "medium",
    "category": "Graphs",
    "description": "Given the necessary inputs for Course Schedule, return the correct output.",
    "problemStatement": "This is a classic problem known as Course Schedule. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Course Schedule",
    "outputFormat": "Standard output as required by Course Schedule",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "graphs",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 62
  },
  {
    "id": 27,
    "slug": "word-ladder",
    "title": "Word Ladder",
    "difficulty": "hard",
    "category": "Graphs",
    "description": "Given the necessary inputs for Word Ladder, return the correct output.",
    "problemStatement": "This is a classic problem known as Word Ladder. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Word Ladder",
    "outputFormat": "Standard output as required by Word Ladder",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "graphs",
      "hard"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 47
  },
  {
    "id": 28,
    "slug": "climbing-stairs",
    "title": "Climbing Stairs",
    "difficulty": "easy",
    "category": "Dynamic Programming",
    "description": "Given the necessary inputs for Climbing Stairs, return the correct output.",
    "problemStatement": "This is a classic problem known as Climbing Stairs. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Climbing Stairs",
    "outputFormat": "Standard output as required by Climbing Stairs",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "dynamic programming",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 80
  },
  {
    "id": 29,
    "slug": "coin-change",
    "title": "Coin Change",
    "difficulty": "medium",
    "category": "Dynamic Programming",
    "description": "Given the necessary inputs for Coin Change, return the correct output.",
    "problemStatement": "This is a classic problem known as Coin Change. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Coin Change",
    "outputFormat": "Standard output as required by Coin Change",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "dynamic programming",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 57
  },
  {
    "id": 30,
    "slug": "longest-common-subsequence",
    "title": "Longest Common Subsequence",
    "difficulty": "medium",
    "category": "Dynamic Programming",
    "description": "Given the necessary inputs for Longest Common Subsequence, return the correct output.",
    "problemStatement": "This is a classic problem known as Longest Common Subsequence. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Longest Common Subsequence",
    "outputFormat": "Standard output as required by Longest Common Subsequence",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "dynamic programming",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 61
  },
  {
    "id": 31,
    "slug": "house-robber",
    "title": "House Robber",
    "difficulty": "medium",
    "category": "Dynamic Programming",
    "description": "Given the necessary inputs for House Robber, return the correct output.",
    "problemStatement": "This is a classic problem known as House Robber. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by House Robber",
    "outputFormat": "Standard output as required by House Robber",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "dynamic programming",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 52
  },
  {
    "id": 32,
    "slug": "word-break",
    "title": "Word Break",
    "difficulty": "medium",
    "category": "Dynamic Programming",
    "description": "Given the necessary inputs for Word Break, return the correct output.",
    "problemStatement": "This is a classic problem known as Word Break. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Word Break",
    "outputFormat": "Standard output as required by Word Break",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "dynamic programming",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 50
  },
  {
    "id": 33,
    "slug": "unique-paths",
    "title": "Unique Paths",
    "difficulty": "medium",
    "category": "Dynamic Programming",
    "description": "Given the necessary inputs for Unique Paths, return the correct output.",
    "problemStatement": "This is a classic problem known as Unique Paths. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Unique Paths",
    "outputFormat": "Standard output as required by Unique Paths",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "dynamic programming",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 63
  },
  {
    "id": 34,
    "slug": "edit-distance",
    "title": "Edit Distance",
    "difficulty": "hard",
    "category": "Dynamic Programming",
    "description": "Given the necessary inputs for Edit Distance, return the correct output.",
    "problemStatement": "This is a classic problem known as Edit Distance. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Edit Distance",
    "outputFormat": "Standard output as required by Edit Distance",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "dynamic programming",
      "hard"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 49
  },
  {
    "id": 35,
    "slug": "search-in-rotated-array",
    "title": "Search in Rotated Array",
    "difficulty": "medium",
    "category": "Binary Search",
    "description": "Given the necessary inputs for Search in Rotated Array, return the correct output.",
    "problemStatement": "This is a classic problem known as Search in Rotated Array. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Search in Rotated Array",
    "outputFormat": "Standard output as required by Search in Rotated Array",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "binary search",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 64
  },
  {
    "id": 36,
    "slug": "find-minimum-in-rotated-array",
    "title": "Find Minimum in Rotated Array",
    "difficulty": "medium",
    "category": "Binary Search",
    "description": "Given the necessary inputs for Find Minimum in Rotated Array, return the correct output.",
    "problemStatement": "This is a classic problem known as Find Minimum in Rotated Array. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Find Minimum in Rotated Array",
    "outputFormat": "Standard output as required by Find Minimum in Rotated Array",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "binary search",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 56
  },
  {
    "id": 37,
    "slug": "search-a-2d-matrix",
    "title": "Search a 2D Matrix",
    "difficulty": "medium",
    "category": "Binary Search",
    "description": "Given the necessary inputs for Search a 2D Matrix, return the correct output.",
    "problemStatement": "This is a classic problem known as Search a 2D Matrix. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Search a 2D Matrix",
    "outputFormat": "Standard output as required by Search a 2D Matrix",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "binary search",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 58
  },
  {
    "id": 38,
    "slug": "median-of-two-sorted-arrays",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "hard",
    "category": "Binary Search",
    "description": "Given the necessary inputs for Median of Two Sorted Arrays, return the correct output.",
    "problemStatement": "This is a classic problem known as Median of Two Sorted Arrays. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Median of Two Sorted Arrays",
    "outputFormat": "Standard output as required by Median of Two Sorted Arrays",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "binary search",
      "hard"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 42
  },
  {
    "id": 39,
    "slug": "top-k-frequent-elements",
    "title": "Top K Frequent Elements",
    "difficulty": "medium",
    "category": "Hashing",
    "description": "Given the necessary inputs for Top K Frequent Elements, return the correct output.",
    "problemStatement": "This is a classic problem known as Top K Frequent Elements. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Top K Frequent Elements",
    "outputFormat": "Standard output as required by Top K Frequent Elements",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "hashing",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 56
  },
  {
    "id": 40,
    "slug": "lru-cache",
    "title": "LRU Cache",
    "difficulty": "medium",
    "category": "Hashing",
    "description": "Given the necessary inputs for LRU Cache, return the correct output.",
    "problemStatement": "This is a classic problem known as LRU Cache. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by LRU Cache",
    "outputFormat": "Standard output as required by LRU Cache",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "hashing",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 54
  },
  {
    "id": 41,
    "slug": "subarray-sum-equals-k",
    "title": "Subarray Sum Equals K",
    "difficulty": "medium",
    "category": "Hashing",
    "description": "Given the necessary inputs for Subarray Sum Equals K, return the correct output.",
    "problemStatement": "This is a classic problem known as Subarray Sum Equals K. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Subarray Sum Equals K",
    "outputFormat": "Standard output as required by Subarray Sum Equals K",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "hashing",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 69
  },
  {
    "id": 42,
    "slug": "implement-queue-using-stacks",
    "title": "Implement Queue using Stacks",
    "difficulty": "easy",
    "category": "Stacks/Queues",
    "description": "Given the necessary inputs for Implement Queue using Stacks, return the correct output.",
    "problemStatement": "This is a classic problem known as Implement Queue using Stacks. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Implement Queue using Stacks",
    "outputFormat": "Standard output as required by Implement Queue using Stacks",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "stacks/queues",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 71
  },
  {
    "id": 43,
    "slug": "daily-temperatures",
    "title": "Daily Temperatures",
    "difficulty": "medium",
    "category": "Stacks/Queues",
    "description": "Given the necessary inputs for Daily Temperatures, return the correct output.",
    "problemStatement": "This is a classic problem known as Daily Temperatures. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Daily Temperatures",
    "outputFormat": "Standard output as required by Daily Temperatures",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "stacks/queues",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 64
  },
  {
    "id": 44,
    "slug": "largest-rectangle-in-histogram",
    "title": "Largest Rectangle in Histogram",
    "difficulty": "hard",
    "category": "Stacks/Queues",
    "description": "Given the necessary inputs for Largest Rectangle in Histogram, return the correct output.",
    "problemStatement": "This is a classic problem known as Largest Rectangle in Histogram. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Largest Rectangle in Histogram",
    "outputFormat": "Standard output as required by Largest Rectangle in Histogram",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "stacks/queues",
      "hard"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 41
  },
  {
    "id": 45,
    "slug": "valid-palindrome",
    "title": "Valid Palindrome",
    "difficulty": "easy",
    "category": "Two Pointers",
    "description": "Given the necessary inputs for Valid Palindrome, return the correct output.",
    "problemStatement": "This is a classic problem known as Valid Palindrome. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Valid Palindrome",
    "outputFormat": "Standard output as required by Valid Palindrome",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "two pointers",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 82
  },
  {
    "id": 46,
    "slug": "trapping-rain-water",
    "title": "Trapping Rain Water",
    "difficulty": "hard",
    "category": "Two Pointers",
    "description": "Given the necessary inputs for Trapping Rain Water, return the correct output.",
    "problemStatement": "This is a classic problem known as Trapping Rain Water. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Trapping Rain Water",
    "outputFormat": "Standard output as required by Trapping Rain Water",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "two pointers",
      "hard"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 42
  },
  {
    "id": 47,
    "slug": "move-zeroes",
    "title": "Move Zeroes",
    "difficulty": "easy",
    "category": "Two Pointers",
    "description": "Given the necessary inputs for Move Zeroes, return the correct output.",
    "problemStatement": "This is a classic problem known as Move Zeroes. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Move Zeroes",
    "outputFormat": "Standard output as required by Move Zeroes",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "two pointers",
      "easy"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 81
  },
  {
    "id": 48,
    "slug": "merge-sort",
    "title": "Merge Sort",
    "difficulty": "medium",
    "category": "Sorting",
    "description": "Given the necessary inputs for Merge Sort, return the correct output.",
    "problemStatement": "This is a classic problem known as Merge Sort. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Merge Sort",
    "outputFormat": "Standard output as required by Merge Sort",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "sorting",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 51
  },
  {
    "id": 49,
    "slug": "quick-sort",
    "title": "Quick Sort",
    "difficulty": "medium",
    "category": "Sorting",
    "description": "Given the necessary inputs for Quick Sort, return the correct output.",
    "problemStatement": "This is a classic problem known as Quick Sort. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Quick Sort",
    "outputFormat": "Standard output as required by Quick Sort",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "sorting",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 59
  },
  {
    "id": 50,
    "slug": "kth-largest-element",
    "title": "Kth Largest Element",
    "difficulty": "medium",
    "category": "Sorting",
    "description": "Given the necessary inputs for Kth Largest Element, return the correct output.",
    "problemStatement": "This is a classic problem known as Kth Largest Element. You need to implement an optimal solution. The goal is to process the input efficiently.",
    "inputFormat": "Standard input as required by Kth Largest Element",
    "outputFormat": "Standard output as required by Kth Largest Element",
    "constraints": [
      "1 <= input.length <= 10^4",
      "-10^9 <= input[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "Example input 1",
        "output": "Example output 1",
        "explanation": "Explanation for example 1"
      },
      {
        "input": "Example input 2",
        "output": "Example output 2",
        "explanation": "Explanation for example 2"
      }
    ],
    "tags": [
      "sorting",
      "medium"
    ],
    "starterCode": [
      {
        "language": "javascript",
        "code": "function solve(input) {\n  // Your code here\n  return null;\n}"
      },
      {
        "language": "python",
        "code": "def solve(input):\n    # Your code here\n    pass"
      }
    ],
    "acceptance": 54
  }
];
