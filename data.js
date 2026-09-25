// ============================================================
// DSA ROADMAP DATA
// Edit this file to add, remove, or reorder roadmap topics.
// ============================================================

const ROADMAP_DATA = [
  {
    phase: "Phase 1",
    title: "Foundations",
    time: "Week 1",
    topics: [
      {
        id: "bigo",
        icon: "⏱️",
        name: "Big-O Notation",
        time: "2–3 days",
        why: "Big-O is the language used to compare every data structure and algorithm. Learn it first because you cannot judge whether your solution is efficient without understanding its time and space complexity.",
        learn: [
          ["What time complexity means", "Count operations instead of measuring seconds."],
          ["O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)", "Know the growth order from fastest to slowest."],
          ["Space complexity", "Understand the extra memory an algorithm uses."],
          ["Best, worst and average case", "For example: quicksort can be O(n²) in the worst case and O(n log n) on average."],
          ["Analysing loops and nested loops", "A loop inside a loop commonly leads to O(n²)."],
          ["Analysing recursive calls", "Use a recursion tree to count branches and depth."]
        ],
        practice: [
          ["Analyse complexity of 10 short code snippets", "Easy"]
        ],
        tip: "Do not spend too long on formal proofs. You should be able to read code and identify whether it is O(n), O(n²), or O(log n)."
      },
      {
        id: "arrays",
        icon: "📦",
        name: "Arrays & Strings",
        time: "3–4 days",
        why: "Arrays and strings are the foundation of DSA. Most beginner and interview questions begin with these structures and their common patterns.",
        learn: [
          ["Array indexing, insertion and deletion", "Understand the O(1) access cost and O(n) insertion or deletion cost."],
          ["Dynamic arrays", "Learn how Python lists, Java ArrayLists, and C++ vectors resize."],
          ["2D arrays and matrices", "Practice row-wise, column-wise, diagonal traversal, and transpose."],
          ["String immutability and slicing", "Understand how strings behave in your programming language."],
          ["Two pointers technique", "Use left/right pointers for pairs, palindromes, and container problems."],
          ["Sliding window technique", "Use fixed or variable windows for substring and subarray problems."],
          ["Prefix sums", "Answer range sum queries quickly after preprocessing."],
          ["Kadane's algorithm", "Find the maximum subarray sum in O(n)."]
        ],
        practice: [
          ["Two Sum", "Easy"],
          ["Best Time to Buy and Sell Stock", "Easy"],
          ["Contains Duplicate", "Easy"],
          ["Longest Substring Without Repeating Characters", "Medium"],
          ["Maximum Subarray - Kadane's Algorithm", "Medium"],
          ["Product of Array Except Self", "Medium"]
        ],
        tip: "Learn sliding window deeply. It is one of the most useful DSA patterns for arrays and strings."
      }
    ]
  },

  {
    phase: "Phase 2",
    title: "Linear Structures",
    time: "Weeks 2–3",
    topics: [
      {
        id: "hash",
        icon: "🗂️",
        name: "Hash Tables",
        time: "2–3 days",
        why: "Hash tables give O(1) average lookup and are one of the highest-value topics in DSA. They are ideal for counting, duplicates, grouping, and fast membership checking.",
        learn: [
          ["Hash function basics", "Understand how a key becomes an array index."],
          ["Handling collisions", "Learn chaining and open addressing concepts."],
          ["Hash map versus hash set", "Maps store key-value pairs; sets store unique values."],
          ["Load factor and resizing", "Understand why average lookup is O(1)."],
          ["Frequency counting pattern", "Count characters, numbers, and occurrences efficiently."],
          ["Grouping with maps", "Group values by a computed key, such as anagrams."]
        ],
        practice: [
          ["Valid Anagram", "Easy"],
          ["Group Anagrams", "Medium"],
          ["Top K Frequent Elements", "Medium"],
          ["Longest Consecutive Sequence", "Medium"]
        ],
        tip: "If a question says duplicates, frequency, count, membership, or lookup, consider using a hash map or hash set."
      },
      {
        id: "linkedlist",
        icon: "🔗",
        name: "Linked Lists",
        time: "3–4 days",
        why: "Linked lists teach pointer manipulation. They are important for university exams and interviews because they test whether you can safely change references between nodes.",
        learn: [
          ["Singly linked list from scratch", "Create Node, insert, delete, search, and display methods."],
          ["Doubly and circular linked lists", "Understand trade-offs compared with singly linked lists."],
          ["Reversing a linked list", "Learn both iterative and recursive reversal."],
          ["Fast and slow pointers", "Use Floyd's algorithm for cycle detection and middle-node problems."],
          ["Merging two sorted lists", "A key pattern used again in merge sort."],
          ["Find the k-th node from the end", "Use two pointers separated by k nodes."],
          ["Array versus linked list", "Know when one structure is better than the other."]
        ],
        practice: [
          ["Reverse Linked List", "Easy"],
          ["Merge Two Sorted Lists", "Easy"],
          ["Linked List Cycle", "Easy"],
          ["Middle of the Linked List", "Easy"],
          ["Remove Nth Node From End of List", "Medium"],
          ["Reorder List", "Medium"]
        ],
        tip: "Draw every node and arrow on paper before writing pointer-changing code."
      },
      {
        id: "stack",
        icon: "🥞",
        name: "Stacks",
        time: "1–2 days",
        why: "Stacks use LIFO order and are used in recursion, undo actions, expression evaluation, parsing, and balanced-bracket checking.",
        learn: [
          ["Stack operations and implementation", "Learn push, pop, peek, isEmpty using arrays and linked lists."],
          ["Balanced parentheses matching", "The classic first stack problem."],
          ["Infix to postfix and prefix conversion", "Useful for academic expression conversion problems."],
          ["Postfix expression evaluation", "Evaluate expressions using a stack."],
          ["Monotonic stack", "Use for next greater element and daily temperatures."],
          ["Min stack", "Store extra state to return the minimum quickly."],
          ["Call stack connection", "Understand how function calls connect to recursion."]
        ],
        practice: [
          ["Valid Parentheses", "Easy"],
          ["Implement Queue Using Stacks", "Easy"],
          ["Min Stack", "Medium"],
          ["Daily Temperatures", "Medium"],
          ["Next Greater Element", "Medium"]
        ],
        tip: "For monotonic stack questions, learn the next-greater-element pattern once and reuse it."
      },
      {
        id: "queue",
        icon: "🚶",
        name: "Queues & Deques",
        time: "1–2 days",
        why: "Queues use FIFO order and are essential for scheduling, buffering, breadth-first search, and level-order tree traversal.",
        learn: [
          ["Queue operations and implementation", "Learn enqueue, dequeue, front, rear, and isEmpty."],
          ["Circular queue", "Understand how freed spaces are reused."],
          ["Deque", "A double-ended queue can insert and remove from both ends."],
          ["Queue using two stacks", "Learn the amortised O(1) approach."],
          ["Priority queue introduction", "This prepares you for heaps later."]
        ],
        practice: [
          ["Number of Recent Calls", "Easy"],
          ["Implement Circular Queue", "Medium"],
          ["Design Deque", "Medium"]
        ],
        tip: "Queues are vital before graphs because BFS uses a queue."
      }
    ]
  },

  {
    phase: "Phase 3",
    title: "Recursion & Backtracking",
    time: "Weeks 4–5",
    topics: [
      {
        id: "recursion",
        icon: "🔄",
        name: "Recursion",
        time: "4–5 days",
        why: "Recursion is a critical DSA checkpoint. Trees, divide and conquer, backtracking, graphs, and dynamic programming all depend on it.",
        learn: [
          ["Base case and recursive case", "Every recursive function needs a stopping condition."],
          ["The call stack", "Visualise recursive function calls stacking and returning."],
          ["Recursion tree", "Draw it to understand repeated subproblems and complexity."],
          ["Recursion on arrays and strings", "Practice checking sorted arrays, subsets, and sums."],
          ["Head and tail recursion", "Understand where the recursive call happens."],
          ["Recursion versus iteration", "Learn how to convert between recursive and iterative solutions."],
          ["Divide and conquer", "Break a problem into smaller halves, then combine results."],
          ["Memoisation introduction", "Save repeated function calls as preparation for DP."]
        ],
        practice: [
          ["Fibonacci - recursive then memoised", "Easy"],
          ["Power of a Number - fast exponentiation", "Medium"],
          ["Subsets of an Array", "Medium"],
          ["Tower of Hanoi", "Medium"],
          ["Generate All Permutations", "Medium"]
        ],
        tip: "If you cannot draw the recursion tree, do not code yet. Draw the calls, base cases, and returns first."
      },
      {
        id: "backtrack",
        icon: "🧭",
        name: "Backtracking",
        time: "3–4 days",
        why: "Backtracking is recursion with choices and undo operations. It is used for subsets, permutations, N-Queens, Sudoku, and path-search problems.",
        learn: [
          ["Choose, explore, un-choose", "The main backtracking template."],
          ["Subsets and power set generation", "Include or exclude each element."],
          ["Permutations", "Generate every possible ordering."],
          ["Combination sum", "Build valid target combinations."],
          ["N-Queens", "The classic backtracking constraint problem."],
          ["Sudoku solver concept", "Apply backtracking in a grid."],
          ["Pruning strategies", "Stop exploring invalid branches early."]
        ],
        practice: [
          ["Subsets", "Medium"],
          ["Permutations", "Medium"],
          ["Combination Sum", "Medium"],
          ["Word Search", "Medium"],
          ["N-Queens", "Hard"]
        ],
        tip: "Remember the template: base case → choose → recurse → undo choice."
      }
    ]
  },

  {
    phase: "Phase 4",
    title: "Trees & Hierarchies",
    time: "Weeks 6–8",
    topics: [
      {
        id: "bitree",
        icon: "🌳",
        name: "Binary Trees",
        time: "4–5 days",
        why: "Binary trees are among the most frequently asked interview topics. They use recursion heavily and help you learn hierarchical data processing.",
        learn: [
          ["Tree terminology", "Root, parent, child, leaf, height, depth, subtree, balanced tree."],
          ["Tree traversals", "Preorder, inorder, postorder, and level-order traversal."],
          ["Recursive and iterative traversals", "Use recursion and stack-based methods."],
          ["Height, depth and diameter", "Use bottom-up recursive thinking."],
          ["Balanced tree check", "Return height and validity together."],
          ["Invert or mirror tree", "A simple but important recursive tree problem."],
          ["Lowest Common Ancestor", "Solve LCA for normal binary trees and BSTs."],
          ["Path sum problems", "Root-to-leaf paths, target sums, and maximum path sums."]
        ],
        practice: [
          ["Invert Binary Tree", "Easy"],
          ["Maximum Depth of Binary Tree", "Easy"],
          ["Same Tree", "Easy"],
          ["Binary Tree Level Order Traversal", "Medium"],
          ["Validate Binary Search Tree", "Medium"],
          ["Diameter of Binary Tree", "Medium"],
          ["Lowest Common Ancestor", "Medium"],
          ["Binary Tree Maximum Path Sum", "Hard"]
        ],
        tip: "Most tree solutions are: solve left subtree, solve right subtree, then combine the results."
      },
      {
        id: "bst",
        icon: "🌲",
        name: "Binary Search Trees",
        time: "2–3 days",
        why: "BSTs store ordered data and offer average O(log n) search, insertion, and deletion when balanced.",
        learn: [
          ["BST property", "Every left subtree value is smaller and every right subtree value is larger."],
          ["Search, insert and delete", "Practice all three operations."],
          ["Delete cases", "Delete nodes with zero, one, and two children."],
          ["Inorder traversal", "Inorder traversal of a BST returns sorted values."],
          ["Build BST from sorted array", "Choose the middle item as the root."],
          ["BST versus hash map", "Use BST when sorted order matters."],
          ["Balanced BST concept", "Know why AVL and Red-Black trees avoid O(n) worst-case behavior."]
        ],
        practice: [
          ["Search in a Binary Search Tree", "Easy"],
          ["Insert into a Binary Search Tree", "Medium"],
          ["Delete Node in a BST", "Medium"],
          ["Kth Smallest Element in a BST", "Medium"]
        ],
        tip: "For deleting a node with two children, replace it with the inorder successor: the smallest node in the right subtree."
      },
      {
        id: "heap",
        icon: "⛰️",
        name: "Heaps & Priority Queues",
        time: "2 days",
        why: "Heaps are powerful for Top-K questions, scheduling, streaming medians, and Dijkstra's shortest path algorithm.",
        learn: [
          ["Min-heap and max-heap", "A heap is a complete binary tree usually stored in an array."],
          ["Heap insertion and extraction", "Use sift-up and sift-down in O(log n)."],
          ["Build heap from array", "Understand why heap construction can be O(n)."],
          ["Array index formulas", "Parent: (i - 1) / 2; children: 2i + 1 and 2i + 2."],
          ["Heap sort concept", "Sort using a heap in O(n log n)."],
          ["Top-K pattern", "Maintain a heap of size k."],
          ["Two heaps pattern", "Use a max-heap and min-heap to find streaming median."]
        ],
        practice: [
          ["Kth Largest Element in an Array", "Medium"],
          ["K Closest Points to Origin", "Medium"],
          ["Top K Frequent Elements", "Medium"],
          ["Find Median from Data Stream", "Hard"]
        ],
        tip: "For k largest elements, keep a min-heap of size k. The smallest among the top k stays at the root."
      },
      {
        id: "trie",
        icon: "🔤",
        name: "Tries (Prefix Trees)",
        time: "2 days",
        why: "Tries are designed for prefix searching. They power autocomplete, dictionary, and word-search features.",
        learn: [
          ["Trie node structure", "Each node stores children and an end-of-word flag."],
          ["Insert", "Add a word character by character."],
          ["Search", "Check whether a complete word exists."],
          ["StartsWith", "Check whether a prefix exists."],
          ["Autocomplete concept", "Find all words below a prefix node."],
          ["Trie versus hash set", "Use tries when prefix queries matter."]
        ],
        practice: [
          ["Implement Trie", "Medium"],
          ["Design Add and Search Words Data Structure", "Medium"],
          ["Word Search II", "Hard"]
        ],
        tip: "A trie is simply a tree where each edge represents a character."
      }
    ]
  },

  {
    phase: "Phase 5",
    title: "Graphs, Sorting & Search",
    time: "Weeks 9–11",
    topics: [
      {
        id: "graphbasics",
        icon: "🕸️",
        name: "Graph Basics & Traversal",
        time: "4–5 days",
        why: "Graphs model connections such as maps, networks, dependencies, and social relationships. BFS and DFS are essential graph traversal methods.",
        learn: [
          ["Graph representations", "Learn adjacency list, adjacency matrix, and edge list."],
          ["Graph types", "Directed, undirected, weighted, unweighted, cyclic, and acyclic."],
          ["Breadth-First Search", "Use a queue; it finds shortest paths in unweighted graphs."],
          ["Depth-First Search", "Use recursion or an explicit stack."],
          ["Connected components", "Run BFS or DFS from each unvisited node."],
          ["Grids as graphs", "Treat each cell as a node with four possible directions."],
          ["Number of islands pattern", "A classic grid DFS or BFS problem."],
          ["Cycle detection", "Use visited states for directed graph cycles."]
        ],
        practice: [
          ["Flood Fill", "Easy"],
          ["Number of Islands", "Medium"],
          ["Max Area of Island", "Medium"],
          ["Clone Graph", "Medium"],
          ["Course Schedule", "Medium"]
        ],
        tip: "Most grid questions are graph questions in disguise. Learn the four-direction loop well."
      },
      {
        id: "graphadv",
        icon: "🛰️",
        name: "Advanced Graphs",
        time: "3–4 days",
        why: "Advanced graph algorithms solve shortest paths, ordering dependencies, connectivity, and minimum-cost connection problems.",
        learn: [
          ["Topological sort", "Order tasks with dependencies using Kahn's algorithm or DFS."],
          ["Dijkstra's algorithm", "Find shortest paths with non-negative edge weights."],
          ["Union-Find or Disjoint Set Union", "Track connected components efficiently."],
          ["Path compression and union by rank", "Optimise Union-Find operations."],
          ["Cycle detection with Union-Find", "Useful for undirected graphs."],
          ["Bellman-Ford concept", "Know it handles negative weights."],
          ["Minimum Spanning Tree", "Understand Kruskal and Prim concepts."]
        ],
        practice: [
          ["Course Schedule II", "Medium"],
          ["Network Delay Time", "Medium"],
          ["Number of Provinces", "Medium"],
          ["Redundant Connection", "Medium"]
        ],
        tip: "Master Union-Find once. It appears in many connection and grouping problems."
      },
      {
        id: "sorting",
        icon: "📊",
        name: "Sorting Algorithms",
        time: "3–4 days",
        why: "Sorting is fundamental for exams, interviews, and efficient algorithm design. Merge sort and quicksort also strengthen divide-and-conquer recursion.",
        learn: [
          ["Bubble, selection and insertion sort", "Understand the basic O(n²) sorting algorithms."],
          ["Merge sort", "Divide, sort halves, and merge; always O(n log n)."],
          ["Quicksort", "Partition around a pivot; O(n log n) average."],
          ["Partition schemes", "Learn Lomuto and Hoare partition concepts."],
          ["Heap sort", "Build a heap and extract values repeatedly."],
          ["Counting and bucket sort", "Use when value ranges are limited."],
          ["Stable sorting", "Know which algorithms preserve the order of equal values."],
          ["Sorting complexity comparison", "Compare time, space, stability, and best/worst cases."]
        ],
        practice: [
          ["Implement Merge Sort", "Medium"],
          ["Implement Quick Sort", "Medium"],
          ["Sort Colors", "Medium"],
          ["Kth Largest Element using Quickselect", "Medium"]
        ],
        tip: "Be able to write merge sort and quicksort from memory for university labs and interviews."
      },
      {
        id: "binsearch",
        icon: "🎯",
        name: "Binary Search",
        time: "2 days",
        why: "Binary search solves sorted or monotonic problems in O(log n). It is much more than just searching in a sorted array.",
        learn: [
          ["Classic binary search", "Use low, high, and mid safely."],
          ["Boundary conditions", "Avoid off-by-one errors."],
          ["First and last occurrence", "Find lower and upper bounds."],
          ["Rotated sorted array", "Identify the sorted half in each iteration."],
          ["Binary search on the answer", "Use when the answer has a monotonic true/false condition."],
          ["Binary search in 2D matrix", "Treat some matrices as a sorted 1D array."]
        ],
        practice: [
          ["Binary Search", "Easy"],
          ["First Bad Version", "Easy"],
          ["Search in Rotated Sorted Array", "Medium"],
          ["Koko Eating Bananas", "Medium"]
        ],
        tip: "Memorise one clean binary-search template and carefully define what low, high, and mid represent."
      }
    ]
  },

  {
    phase: "Phase 6",
    title: "Dynamic Programming",
    time: "Weeks 12–14",
    topics: [
      {
        id: "dp1",
        icon: "🧩",
        name: "DP Fundamentals",
        time: "4–5 days",
        why: "Dynamic programming solves problems with overlapping subproblems and optimal substructure. It is one of the most challenging but valuable DSA topics.",
        learn: [
          ["Overlapping subproblems", "Identify repeated recursive work."],
          ["Optimal substructure", "A bigger answer can be built from smaller optimal answers."],
          ["Top-down memoisation", "Use recursion plus a cache."],
          ["Bottom-up tabulation", "Build answers iteratively in a table."],
          ["State definition", "Define what dp[i] or dp[i][j] represents."],
          ["Transition relation", "Determine how current state uses earlier states."],
          ["Space optimisation", "Use rolling variables or arrays when possible."],
          ["1D DP classics", "Practice climbing stairs, house robber, coin change."]
        ],
        practice: [
          ["Climbing Stairs", "Easy"],
          ["House Robber", "Medium"],
          ["Coin Change", "Medium"],
          ["Longest Increasing Subsequence", "Medium"],
          ["Word Break", "Medium"]
        ],
        tip: "First write the recursive solution. Then memoise it. Finally convert it to bottom-up tabulation."
      },
      {
        id: "dp2",
        icon: "🧮",
        name: "2D & Advanced DP",
        time: "4–5 days",
        why: "Two-dimensional DP is important for grids, strings, subsequences, and knapsack-style problems.",
        learn: [
          ["Grid DP", "Solve unique paths and minimum path sum."],
          ["0/1 Knapsack", "Each item can be used at most once."],
          ["Unbounded Knapsack", "Items can be used multiple times."],
          ["Longest Common Subsequence", "The foundation of many string DP problems."],
          ["Edit Distance", "Find minimum insertions, deletions, and replacements."],
          ["Palindrome DP", "Use DP for substrings and partitions."],
          ["DP versus greedy", "Know when a local greedy choice is not enough."]
        ],
        practice: [
          ["Unique Paths", "Medium"],
          ["Minimum Path Sum", "Medium"],
          ["Partition Equal Subset Sum", "Medium"],
          ["Longest Common Subsequence", "Medium"],
          ["Edit Distance", "Medium"],
          ["Longest Palindromic Substring", "Medium"]
        ],
        tip: "Learn 0/1 knapsack deeply. Many DP questions are variations of it."
      }
    ]
  },

  {
    phase: "Phase 7",
    title: "Advanced Topics & Mastery",
    time: "Ongoing",
    topics: [
      {
        id: "advanced",
        icon: "🏆",
        name: "Advanced Structures",
        time: "1–2 weeks",
        why: "These structures are useful for competitive programming, advanced coursework, and understanding how databases and search systems work.",
        learn: [
          ["Segment trees", "Answer range queries with updates in O(log n)."],
          ["Fenwick tree or BIT", "Efficient prefix-sum updates and queries."],
          ["Sparse table concept", "Fast immutable range queries."],
          ["AVL and Red-Black tree concepts", "Understand self-balancing BSTs and rotations."],
          ["B-Tree concept", "Understand how databases and file systems store indexed data."]
        ],
        practice: [
          ["Range Sum Query - Mutable", "Medium"],
          ["Implement Fenwick Tree", "Medium"]
        ],
        tip: "Advanced structures are optional for basic interviews but valuable for competitive programming and deeper computer-science knowledge."
      },
      {
        id: "greedy",
        icon: "🤏",
        name: "Greedy Algorithms",
        time: "2–3 days",
        why: "Greedy algorithms choose the best immediate option. The coding is often short, but proving that the choice is safe is the real challenge.",
        learn: [
          ["Greedy choice property", "Understand when local choices produce a global optimum."],
          ["Interval scheduling", "Select maximum non-overlapping intervals by sorting end times."],
          ["Jump game pattern", "Track farthest reachable position."],
          ["Gas station pattern", "Use running fuel balance."],
          ["Huffman coding concept", "Learn a greedy application in compression."],
          ["Greedy versus DP", "Use DP when a greedy choice cannot be proven safe."]
        ],
        practice: [
          ["Assign Cookies", "Easy"],
          ["Jump Game", "Medium"],
          ["Non-overlapping Intervals", "Medium"],
          ["Gas Station", "Medium"]
        ],
        tip: "For interval questions, try sorting by end time first."
      },
      {
        id: "interview",
        icon: "🎯",
        name: "Interview & Exam Mode",
        time: "2–3 weeks",
        why: "Knowing DSA concepts is not enough. You must practise identifying patterns and solving problems within time limits.",
        learn: [
          ["Pattern recognition", "Name the likely pattern before writing code."],
          ["Timed practice", "Target one easy problem in 15 minutes and one medium problem in 30 minutes."],
          ["Complexity explanation", "Explain time and space complexity clearly."],
          ["Revision of weak topics", "Re-solve problems you previously failed."],
          ["Mock interviews", "Practise explaining your approach aloud."],
          ["Paper coding", "Prepare for university practical exams without autocomplete."]
        ],
        practice: [
          ["Solve 50 mixed problems under time pressure", "Medium"],
          ["Complete two mock interviews", "Hard"]
        ],
        tip: "Re-solving old failed questions after a week teaches more than only solving new random problems."
      }
    ]
  }
];
