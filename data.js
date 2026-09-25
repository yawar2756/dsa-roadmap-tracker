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
        why: "Big-O helps you measure how efficient an algorithm is. Learn it first so you can compare solutions properly.",
        learn: [
          ["What time complexity means", "Count operations instead of seconds."],
          ["Common complexities", "O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)."],
          ["Space complexity", "Understand extra memory used by an algorithm."],
          ["Best, worst and average case", "Know how algorithm performance can change."],
          ["Loop complexity", "Analyse single loops and nested loops."],
          ["Recursion complexity", "Use recursion trees to estimate calls."]
        ],
        practice: [
          {
            name: "Analyse complexity of 10 code snippets",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/dsa/analysis-algorithms-big-o-analysis/"
          }
        ],
        tip: "You do not need formal proofs initially. Be able to identify O(n), O(n²), and O(log n) from code."
      },
      {
        id: "arrays",
        icon: "📦",
        name: "Arrays & Strings",
        time: "3–4 days",
        why: "Arrays and strings are the base of DSA. Most beginner and interview questions start with these patterns.",
        learn: [
          ["Array indexing, insertion and deletion", "Understand O(1) access and O(n) insertion or deletion."],
          ["Dynamic arrays", "Learn Python lists, C++ vectors, or Java ArrayLists."],
          ["2D arrays and matrices", "Practice rows, columns, diagonals and transpose."],
          ["String operations", "Slicing, immutability and character counting."],
          ["Two pointers", "Use left/right pointers for pair sums and palindromes."],
          ["Sliding window", "Use fixed and variable windows for subarray/substring problems."],
          ["Prefix sums", "Answer range-sum queries quickly."],
          ["Kadane's algorithm", "Find maximum subarray sum in O(n)."]
        ],
        practice: [
          {
            name: "Two Sum",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/two-sum/"
          },
          {
            name: "Best Time to Buy and Sell Stock",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
          },
          {
            name: "Contains Duplicate",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/contains-duplicate/"
          },
          {
            name: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
          },
          {
            name: "Maximum Subarray",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/maximum-subarray/"
          },
          {
            name: "Product of Array Except Self",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/product-of-array-except-self/"
          }
        ],
        tip: "Master sliding window and two pointers. They appear in many interview problems."
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
        why: "Hash maps and sets provide fast average O(1) lookup. Use them for frequency counts, duplicate checks and grouping.",
        learn: [
          ["Hash function basics", "Learn how keys become indexes."],
          ["Collision handling", "Understand chaining and open addressing."],
          ["Hash map vs hash set", "Map: key-value. Set: unique values."],
          ["Load factor and resizing", "Understand average O(1) lookup."],
          ["Frequency counting", "Count characters or numbers efficiently."],
          ["Grouping with maps", "Group anagrams and similar values."]
        ],
        practice: [
          {
            name: "Valid Anagram",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/valid-anagram/"
          },
          {
            name: "Group Anagrams",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/group-anagrams/"
          },
          {
            name: "Top K Frequent Elements",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/top-k-frequent-elements/"
          },
          {
            name: "Longest Consecutive Sequence",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/longest-consecutive-sequence/"
          }
        ],
        tip: "If a question involves duplicates, counts, frequencies or fast lookup, think hash map or hash set."
      },
      {
        id: "linkedlist",
        icon: "🔗",
        name: "Linked Lists",
        time: "3–4 days",
        why: "Linked lists teach pointer manipulation and are important for exams and interviews.",
        learn: [
          ["Singly linked list", "Create Node, insert, delete, search and display methods."],
          ["Doubly linked list", "Understand previous and next node pointers."],
          ["Circular linked list", "Learn how the last node connects to the first."],
          ["Reverse linked list", "Practice iterative and recursive reversal."],
          ["Fast and slow pointers", "Use for cycle detection and middle node problems."],
          ["Merge sorted lists", "Important pattern for merge sort."],
          ["Kth node from end", "Use two pointers with a fixed gap."]
        ],
        practice: [
          {
            name: "Reverse Linked List",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/reverse-linked-list/"
          },
          {
            name: "Merge Two Sorted Lists",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/merge-two-sorted-lists/"
          },
          {
            name: "Linked List Cycle",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/linked-list-cycle/"
          },
          {
            name: "Middle of the Linked List",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/middle-of-the-linked-list/"
          },
          {
            name: "Remove Nth Node From End of List",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
          },
          {
            name: "Reorder List",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/reorder-list/"
          }
        ],
        tip: "Draw nodes and arrows before writing pointer-changing code."
      },
      {
        id: "stack",
        icon: "🥞",
        name: "Stacks",
        time: "1–2 days",
        why: "Stacks use LIFO order and are used in recursion, undo actions, parsing and expression evaluation.",
        learn: [
          ["Stack operations", "Push, pop, peek and isEmpty."],
          ["Stack implementation", "Build it using arrays and linked lists."],
          ["Balanced parentheses", "Classic stack pattern."],
          ["Infix to postfix and prefix", "Useful for academic expression conversion."],
          ["Postfix evaluation", "Evaluate expressions using stack."],
          ["Monotonic stack", "Next greater element and daily temperatures."],
          ["Min stack", "Return minimum in O(1)."]
        ],
        practice: [
          {
            name: "Valid Parentheses",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/valid-parentheses/"
          },
          {
            name: "Implement Queue Using Stacks",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/implement-queue-using-stacks/"
          },
          {
            name: "Min Stack",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/min-stack/"
          },
          {
            name: "Daily Temperatures",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/daily-temperatures/"
          },
          {
            name: "Next Greater Element",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/next-greater-element-i/"
          }
        ],
        tip: "For monotonic stack problems, learn next greater element first."
      },
      {
        id: "queue",
        icon: "🚶",
        name: "Queues & Deques",
        time: "1–2 days",
        why: "Queues use FIFO order and are essential for BFS, scheduling and buffering.",
        learn: [
          ["Queue operations", "Enqueue, dequeue, front, rear and isEmpty."],
          ["Queue implementation", "Build with arrays and linked lists."],
          ["Circular queue", "Reuse empty positions efficiently."],
          ["Deque", "Insert and remove from both ends."],
          ["Queue using stacks", "Learn amortised O(1) approach."],
          ["Priority queue introduction", "Prepare for heaps."]
        ],
        practice: [
          {
            name: "Number of Recent Calls",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/number-of-recent-calls/"
          },
          {
            name: "Design Circular Queue",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/design-circular-queue/"
          },
          {
            name: "Design Front Middle Back Queue",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/design-front-middle-back-queue/"
          }
        ],
        tip: "BFS uses a queue, so learn this before starting graphs."
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
        why: "Recursion is essential for trees, divide and conquer, backtracking, graphs and dynamic programming.",
        learn: [
          ["Base case", "Every recursive function needs a stopping condition."],
          ["Recursive case", "Solve a smaller version of the same problem."],
          ["Call stack", "Understand function calls and return order."],
          ["Recursion tree", "Draw calls to understand complexity."],
          ["Recursion on arrays", "Practice sums, sorted checks and subsets."],
          ["Head and tail recursion", "Learn call placement differences."],
          ["Recursion vs iteration", "Convert between both forms."],
          ["Memoisation introduction", "Save repeated calls for DP."]
        ],
        practice: [
          {
            name: "Fibonacci Number",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/fibonacci-number/"
          },
          {
            name: "Power of Two",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/power-of-two/"
          },
          {
            name: "Subsets",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/subsets/"
          },
          {
            name: "Permutations",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/permutations/"
          },
          {
            name: "Pow(x, n)",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/powx-n/"
          }
        ],
        tip: "Draw the recursion tree before coding. If you cannot draw it, do not code it yet."
      },
      {
        id: "backtrack",
        icon: "🧭",
        name: "Backtracking",
        time: "3–4 days",
        why: "Backtracking is recursion plus undo. It is used for subsets, permutations, Sudoku and N-Queens.",
        learn: [
          ["Choose, explore, un-choose", "The universal backtracking template."],
          ["Subsets", "Include or exclude each element."],
          ["Permutations", "Generate all possible orderings."],
          ["Combination sum", "Build valid combinations."],
          ["N-Queens", "Classic constraint backtracking."],
          ["Sudoku solver", "Apply choices inside a grid."],
          ["Pruning", "Stop invalid branches early."]
        ],
        practice: [
          {
            name: "Subsets",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/subsets/"
          },
          {
            name: "Permutations",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/permutations/"
          },
          {
            name: "Combination Sum",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/combination-sum/"
          },
          {
            name: "Word Search",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/word-search/"
          },
          {
            name: "N-Queens",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/n-queens/"
          }
        ],
        tip: "Follow this order: base case → choose → recurse → undo choice."
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
        why: "Binary trees are one of the most frequently asked DSA topics. They build your recursion and hierarchical problem-solving skills.",
        learn: [
          ["Tree terminology", "Root, leaf, parent, child, height, depth and subtree."],
          ["Preorder traversal", "Root, left, right."],
          ["Inorder traversal", "Left, root, right."],
          ["Postorder traversal", "Left, right, root."],
          ["Level-order traversal", "BFS using a queue."],
          ["Height and depth", "Compute recursively."],
          ["Diameter", "Find longest path between nodes."],
          ["Lowest Common Ancestor", "Find common parent for two nodes."]
        ],
        practice: [
          {
            name: "Invert Binary Tree",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/invert-binary-tree/"
          },
          {
            name: "Maximum Depth of Binary Tree",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
          },
          {
            name: "Same Tree",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/same-tree/"
          },
          {
            name: "Binary Tree Level Order Traversal",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
          },
          {
            name: "Diameter of Binary Tree",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/diameter-of-binary-tree/"
          },
          {
            name: "Lowest Common Ancestor",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
          }
        ],
        tip: "Most tree problems follow: solve left subtree, solve right subtree, combine results."
      },
      {
        id: "bst",
        icon: "🌲",
        name: "Binary Search Trees",
        time: "2–3 days",
        why: "BSTs store sorted data and support average O(log n) search, insertion and deletion.",
        learn: [
          ["BST property", "Left subtree values are smaller; right subtree values are larger."],
          ["Search", "Find a value efficiently."],
          ["Insert", "Place a value in the correct position."],
          ["Delete", "Handle nodes with zero, one and two children."],
          ["Inorder traversal", "Returns values in sorted order."],
          ["Build from sorted array", "Use middle value as root."],
          ["Balanced BST concept", "Know why self-balancing trees matter."]
        ],
        practice: [
          {
            name: "Search in a Binary Search Tree",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/search-in-a-binary-search-tree/"
          },
          {
            name: "Insert into a Binary Search Tree",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/insert-into-a-binary-search-tree/"
          },
          {
            name: "Delete Node in a BST",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/delete-node-in-a-bst/"
          },
          {
            name: "Kth Smallest Element in a BST",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
          }
        ],
        tip: "For deletion with two children, replace the node using its inorder successor."
      },
      {
        id: "heap",
        icon: "⛰️",
        name: "Heaps & Priority Queues",
        time: "2 days",
        why: "Heaps are used for Top-K problems, scheduling, Dijkstra and streaming median problems.",
        learn: [
          ["Min-heap and max-heap", "Learn heap ordering rules."],
          ["Array representation", "Parent and child index formulas."],
          ["Heap insertion", "Use sift-up."],
          ["Heap extraction", "Use sift-down."],
          ["Build heap", "Convert array into heap."],
          ["Heap sort", "Sort using a heap."],
          ["Top-K pattern", "Maintain heap of size k."],
          ["Two heaps", "Find median in a stream."]
        ],
        practice: [
          {
            name: "Kth Largest Element in an Array",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/kth-largest-element-in-an-array/"
          },
          {
            name: "K Closest Points to Origin",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/k-closest-points-to-origin/"
          },
          {
            name: "Top K Frequent Elements",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/top-k-frequent-elements/"
          },
          {
            name: "Find Median from Data Stream",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/find-median-from-data-stream/"
          }
        ],
        tip: "For k largest elements, use a min-heap of size k."
      },
      {
        id: "trie",
        icon: "🔤",
        name: "Tries (Prefix Trees)",
        time: "2 days",
        why: "Tries are useful for autocomplete, dictionaries, prefix searches and word-search problems.",
        learn: [
          ["Trie node structure", "Children map plus end-of-word flag."],
          ["Insert words", "Add one character at a time."],
          ["Search words", "Check complete word existence."],
          ["Prefix search", "Check if a prefix exists."],
          ["Autocomplete concept", "Collect words below prefix node."],
          ["Trie vs hash set", "Use trie when prefix matching matters."]
        ],
        practice: [
          {
            name: "Implement Trie",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/implement-trie-prefix-tree/"
          },
          {
            name: "Design Add and Search Words",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/"
          },
          {
            name: "Word Search II",
            difficulty: "Hard",
            url: "https://leetcode.com/problems/word-search-ii/"
          }
        ],
        tip: "A trie is simply a tree where every edge represents a character."
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
        why: "Graphs model networks, connections, maps and dependencies. BFS and DFS are essential graph algorithms.",
        learn: [
          ["Graph representations", "Adjacency list, matrix and edge list."],
          ["Graph types", "Directed, undirected, weighted and unweighted."],
          ["BFS", "Use queue for breadth-first traversal."],
          ["DFS", "Use recursion or stack for depth-first traversal."],
          ["Connected components", "Run DFS/BFS from each unvisited node."],
          ["Grids as graphs", "Treat cells as nodes."],
          ["Number of islands pattern", "Classic grid DFS/BFS."],
          ["Cycle detection", "Use visited states."]
        ],
        practice: [
          {
            name: "Flood Fill",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/flood-fill/"
          },
          {
            name: "Number of Islands",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/number-of-islands/"
          },
          {
            name: "Max Area of Island",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/max-area-of-island/"
          },
          {
            name: "Clone Graph",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/clone-graph/"
          },
          {
            name: "Course Schedule",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/course-schedule/"
          }
        ],
        tip: "Most grid questions are graph questions in disguise."
      },
      {
        id: "graphadv",
        icon: "🛰️",
        name: "Advanced Graphs",
        time: "3–4 days",
        why: "Advanced graph algorithms solve shortest path, dependency and connectivity problems.",
        learn: [
          ["Topological sort", "Order tasks with dependencies."],
          ["Kahn's algorithm", "BFS topological sorting using indegrees."],
          ["Dijkstra's algorithm", "Shortest path with non-negative edges."],
          ["Union-Find", "Track connected components."],
          ["Path compression", "Optimise Union-Find."],
          ["Union by rank", "Keep Union-Find trees balanced."],
          ["Minimum spanning tree", "Understand Kruskal and Prim."]
        ],
        practice: [
          {
            name: "Course Schedule II",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/course-schedule-ii/"
          },
          {
            name: "Network Delay Time",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/network-delay-time/"
          },
          {
            name: "Number of Provinces",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/number-of-provinces/"
          },
          {
            name: "Redundant Connection",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/redundant-connection/"
          }
        ],
        tip: "Master Union-Find once. It is useful in many grouping and connection problems."
      },
      {
        id: "sorting",
        icon: "📊",
        name: "Sorting Algorithms",
        time: "3–4 days",
        why: "Sorting is important for DSA exams and interviews. Merge sort and quicksort teach divide-and-conquer.",
        learn: [
          ["Bubble sort", "Basic O(n²) sort."],
          ["Selection sort", "Select minimum value each pass."],
          ["Insertion sort", "Efficient for small or nearly sorted arrays."],
          ["Merge sort", "Stable divide-and-conquer O(n log n) sorting."],
          ["Quick sort", "Partition around a pivot."],
          ["Partition methods", "Lomuto and Hoare partition concepts."],
          ["Heap sort", "Sort using heap."],
          ["Counting sort", "Use when range is limited."]
        ],
        practice: [
          {
            name: "Sort an Array",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/sort-an-array/"
          },
          {
            name: "Sort Colors",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/sort-colors/"
          },
          {
            name: "Kth Largest Element in an Array",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/kth-largest-element-in-an-array/"
          }
        ],
        tip: "Learn merge sort and quicksort well enough to write them without copying."
      },
      {
        id: "binsearch",
        icon: "🎯",
        name: "Binary Search",
        time: "2 days",
        why: "Binary search solves sorted and monotonic problems in O(log n).",
        learn: [
          ["Classic binary search", "Find value in sorted array."],
          ["Boundary conditions", "Avoid off-by-one mistakes."],
          ["First and last occurrence", "Find lower and upper bounds."],
          ["Rotated sorted array", "Identify sorted half."],
          ["Binary search on answer", "Use for monotonic true/false conditions."],
          ["2D matrix search", "Search sorted matrix efficiently."]
        ],
        practice: [
          {
            name: "Binary Search",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/binary-search/"
          },
          {
            name: "First Bad Version",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/first-bad-version/"
          },
          {
            name: "Search in Rotated Sorted Array",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
          },
          {
            name: "Koko Eating Bananas",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/koko-eating-bananas/"
          }
        ],
        tip: "Use one clean binary-search template consistently."
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
        why: "Dynamic programming solves overlapping subproblems efficiently using memoisation or tabulation.",
        learn: [
          ["Overlapping subproblems", "Identify repeated work."],
          ["Optimal substructure", "Build bigger solution from smaller optimal solutions."],
          ["Top-down memoisation", "Recursion plus cache."],
          ["Bottom-up tabulation", "Iterative DP table."],
          ["State definition", "Define dp[i] clearly."],
          ["Transition relation", "Find relationship with previous states."],
          ["Space optimisation", "Reduce memory using rolling variables."],
          ["1D DP patterns", "Climbing stairs, house robber and coin change."]
        ],
        practice: [
          {
            name: "Climbing Stairs",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/climbing-stairs/"
          },
          {
            name: "House Robber",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/house-robber/"
          },
          {
            name: "Coin Change",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/coin-change/"
          },
          {
            name: "Longest Increasing Subsequence",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/longest-increasing-subsequence/"
          },
          {
            name: "Word Break",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/word-break/"
          }
        ],
        tip: "Solve recursively first, then add memoisation, then convert it to tabulation."
      },
      {
        id: "dp2",
        icon: "🧮",
        name: "2D & Advanced DP",
        time: "4–5 days",
        why: "2D DP is used for grids, strings, knapsack and subsequence problems.",
        learn: [
          ["Grid DP", "Unique paths and minimum path sum."],
          ["0/1 Knapsack", "Use each item at most once."],
          ["Unbounded Knapsack", "Reuse items multiple times."],
          ["Longest Common Subsequence", "Core string DP pattern."],
          ["Edit Distance", "Minimum changes to convert one string into another."],
          ["Palindrome DP", "Solve substring and partition questions."],
          ["DP vs greedy", "Know when greedy is not enough."]
        ],
        practice: [
          {
            name: "Unique Paths",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/unique-paths/"
          },
          {
            name: "Minimum Path Sum",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/minimum-path-sum/"
          },
          {
            name: "Partition Equal Subset Sum",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/partition-equal-subset-sum/"
          },
          {
            name: "Longest Common Subsequence",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/longest-common-subsequence/"
          },
          {
            name: "Edit Distance",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/edit-distance/"
          }
        ],
        tip: "Master 0/1 knapsack. Many DP problems are variations of it."
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
        why: "Advanced structures improve your competitive programming and deeper computer-science understanding.",
        learn: [
          ["Segment tree", "Range queries with updates in O(log n)."],
          ["Fenwick tree", "Efficient prefix sums with updates."],
          ["Sparse table", "Fast immutable range queries."],
          ["AVL tree concept", "Self-balancing BST."],
          ["Red-Black tree concept", "Used in libraries and systems."],
          ["B-Tree concept", "Used by databases and file systems."]
        ],
        practice: [
          {
            name: "Range Sum Query - Mutable",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/range-sum-query-mutable/"
          }
        ],
        tip: "Advanced structures are optional for basic interviews but excellent for competitive programming."
      },
      {
        id: "greedy",
        icon: "🤏",
        name: "Greedy Algorithms",
        time: "2–3 days",
        why: "Greedy algorithms make locally best choices. The challenge is proving that the choice is safe.",
        learn: [
          ["Greedy choice property", "Know when local optimum gives global optimum."],
          ["Interval scheduling", "Sort by end time."],
          ["Jump game", "Track farthest reachable index."],
          ["Gas station", "Use running fuel balance."],
          ["Huffman coding", "Greedy application in compression."],
          ["Greedy vs DP", "Use DP if greedy cannot be proven correct."]
        ],
        practice: [
          {
            name: "Assign Cookies",
            difficulty: "Easy",
            url: "https://leetcode.com/problems/assign-cookies/"
          },
          {
            name: "Jump Game",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/jump-game/"
          },
          {
            name: "Non-overlapping Intervals",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/non-overlapping-intervals/"
          },
          {
            name: "Gas Station",
            difficulty: "Medium",
            url: "https://leetcode.com/problems/gas-station/"
          }
        ],
        tip: "For interval questions, try sorting by end time first."
      },
      {
        id: "interview",
        icon: "🎯",
        name: "Interview & Exam Mode",
        time: "2–3 weeks",
        why: "Knowledge becomes useful only when you can solve and explain problems under time pressure.",
        learn: [
          ["Pattern recognition", "Identify the probable pattern before coding."],
          ["Timed practice", "Easy in 15 minutes, medium in 30 minutes."],
          ["Complexity explanation", "Explain time and space complexity."],
          ["Mock interviews", "Practise explaining your thinking aloud."],
          ["Revision strategy", "Re-solve previous failed questions."],
          ["Paper coding", "Prepare for college exams without autocomplete."]
        ],
        practice: [
          {
            name: "Solve 50 mixed DSA problems",
            difficulty: "Medium",
            url: "https://leetcode.com/problemset/"
          },
          {
            name: "Complete two mock interviews",
            difficulty: "Hard",
            url: "https://www.pramp.com/"
          }
        ],
        tip: "Re-solving old failed questions after one week is more valuable than only solving new questions."
      }
    ]
  }
];

const DAILY_CHALLENGES = [
  {
    topicId: "arrays",
    title: "Two Sum",
    difficulty: "Easy",
    url: "https://leetcode.com/problems/two-sum/",
    hint: "Use a hash map to store previously seen numbers."
  },
  {
    topicId: "linkedlist",
    title: "Reverse Linked List",
    difficulty: "Easy",
    url: "https://leetcode.com/problems/reverse-linked-list/",
    hint: "Keep previous, current and next node references."
  },
  {
    topicId: "stack",
    title: "Valid Parentheses",
    difficulty: "Easy",
    url: "https://leetcode.com/problems/valid-parentheses/",
    hint: "Push opening brackets and match closing brackets."
  },
  {
    topicId: "recursion",
    title: "Subsets",
    difficulty: "Medium",
    url: "https://leetcode.com/problems/subsets/",
    hint: "For each number, choose include or exclude."
  },
  {
    topicId: "bitree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    hint: "Depth is 1 plus the maximum depth of left and right children."
  },
  {
    topicId: "graphbasics",
    title: "Number of Islands",
    difficulty: "Medium",
    url: "https://leetcode.com/problems/number-of-islands/",
    hint: "Use DFS or BFS to mark every connected land cell visited."
  },
  {
    topicId: "binsearch",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    hint: "One half is always sorted; decide which half contains target."
  },
  {
    topicId: "dp1",
    title: "House Robber",
    difficulty: "Medium",
    url: "https://leetcode.com/problems/house-robber/",
    hint: "At each house, choose rob or skip."
  }
];

const BADGES = [
  {
    id: "first-step",
    icon: "🌱",
    name: "First Step",
    description: "Complete your first checkpoint.",
    condition: "checkpoint",
    required: 1
  },
  {
    id: "arrays-explorer",
    icon: "📦",
    name: "Arrays Explorer",
    description: "Complete Arrays & Strings.",
    condition: "topic",
    topicId: "arrays"
  },
  {
    id: "linear-learner",
    icon: "🔗",
    name: "Linear Learner",
    description: "Complete Hash Tables, Linked Lists, Stacks and Queues.",
    condition: "topics",
    topicIds: ["hash", "linkedlist", "stack", "queue"]
  },
  {
    id: "recursion-explorer",
    icon: "🔄",
    name: "Recursion Explorer",
    description: "Complete Recursion.",
    condition: "topic",
    topicId: "recursion"
  },
  {
    id: "tree-climber",
    icon: "🌳",
    name: "Tree Climber",
    description: "Complete Binary Trees and BSTs.",
    condition: "topics",
    topicIds: ["bitree", "bst"]
  },
  {
    id: "graph-navigator",
    icon: "🕸️",
    name: "Graph Navigator",
    description: "Complete Graph Basics & Traversal.",
    condition: "topic",
    topicId: "graphbasics"
  },
  {
    id: "dp-warrior",
    icon: "🧩",
    name: "DP Warrior",
    description: "Complete both Dynamic Programming topics.",
    condition: "topics",
    topicIds: ["dp1", "dp2"]
  },
  {
    id: "problem-solver",
    icon: "💻",
    name: "Problem Solver",
    description: "Mark 10 practice problems as solved.",
    condition: "problems",
    required: 10
  },
  {
    id: "consistent-learner",
    icon: "🔥",
    name: "Consistent Learner",
    description: "Maintain a 7-day streak.",
    condition: "streak",
    required: 7
  },
  {
    id: "roadmap-champion",
    icon: "🏆",
    name: "Roadmap Champion",
    description: "Complete every DSA topic.",
    condition: "all-topics"
  }
];
