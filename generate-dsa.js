import fs from 'fs';
import path from 'path';

const categories = {
  Arrays: ["Two Sum|easy", "Best Time to Buy/Sell Stock|easy", "Contains Duplicate|easy", "Product of Array Except Self|medium", "Maximum Subarray|medium", "Merge Intervals|medium", "3Sum|medium", "Container With Most Water|medium"],
  Strings: ["Valid Anagram|easy", "Longest Substring Without Repeating|medium", "Valid Parentheses|easy", "Longest Palindromic Substring|medium", "Group Anagrams|medium", "Minimum Window Substring|hard"],
  "Linked Lists": ["Reverse Linked List|easy", "Merge Two Sorted Lists|easy", "Linked List Cycle|easy", "Remove Nth Node From End|medium"],
  Trees: ["Maximum Depth of Binary Tree|easy", "Validate BST|medium", "Level Order Traversal|medium", "Lowest Common Ancestor|medium", "Serialize/Deserialize|hard"],
  Graphs: ["Number of Islands|medium", "Clone Graph|medium", "Course Schedule|medium", "Word Ladder|hard"],
  "Dynamic Programming": ["Climbing Stairs|easy", "Coin Change|medium", "Longest Common Subsequence|medium", "House Robber|medium", "Word Break|medium", "Unique Paths|medium", "Edit Distance|hard"],
  "Binary Search": ["Search in Rotated Array|medium", "Find Minimum in Rotated Array|medium", "Search a 2D Matrix|medium", "Median of Two Sorted Arrays|hard"],
  Hashing: ["Top K Frequent Elements|medium", "LRU Cache|medium", "Subarray Sum Equals K|medium"],
  "Stacks/Queues": ["Implement Queue using Stacks|easy", "Daily Temperatures|medium", "Largest Rectangle in Histogram|hard"],
  "Two Pointers": ["Valid Palindrome|easy", "Trapping Rain Water|hard", "Move Zeroes|easy"],
  Sorting: ["Merge Sort|medium", "Quick Sort|medium", "Kth Largest Element|medium"]
};

let questions = [];
let idCounter = 1;

for (const [category, qs] of Object.entries(categories)) {
  for (const q of qs) {
    const [title, difficulty] = q.split('|');
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const isHard = difficulty === 'hard';
    const acceptance = isHard ? 40 + Math.floor(Math.random() * 10) : (difficulty === 'medium' ? 50 + Math.floor(Math.random() * 20) : 70 + Math.floor(Math.random() * 15));
    
    questions.push({
      id: idCounter++,
      slug,
      title,
      difficulty,
      category,
      description: `Given the necessary inputs for ${title}, return the correct output.`,
      problemStatement: `This is a classic problem known as ${title}. You need to implement an optimal solution. The goal is to process the input efficiently.`,
      inputFormat: `Standard input as required by ${title}`,
      outputFormat: `Standard output as required by ${title}`,
      constraints: [
        `1 <= input.length <= 10^4`,
        `-10^9 <= input[i] <= 10^9`
      ],
      examples: [
        {
          input: `Example input 1`,
          output: `Example output 1`,
          explanation: `Explanation for example 1`
        },
        {
          input: `Example input 2`,
          output: `Example output 2`,
          explanation: `Explanation for example 2`
        }
      ],
      tags: [category.toLowerCase(), difficulty],
      starterCode: [
        {
          language: "javascript",
          code: `function solve(input) {\n  // Your code here\n  return null;\n}`
        },
        {
          language: "python",
          code: `def solve(input):\n    # Your code here\n    pass`
        }
      ],
      acceptance
    });
  }
}

const fileContent = `export interface DSAQuestionData {
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

export const dsaQuestions: DSAQuestionData[] = ${JSON.stringify(questions, null, 2)};
`;

const dirPath = path.join(process.cwd(), 'src', 'lib', 'data');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}
fs.writeFileSync(path.join(dirPath, 'dsa-questions.ts'), fileContent);
console.log('Generated src/lib/data/dsa-questions.ts');
