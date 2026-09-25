// ============================================================
//  ROADMAP DATA — edit this file to add / change / reorder topics
//  Each topic: id (unique), icon, name, time estimate, why,
//  learn: [ [title, detail], ... ], practice: [ [problem, difficulty], ... ]
// ============================================================
const ROADMAP_DATA = [
  {
    phase: "Phase 1", title: "Foundations", time: "Week 1",
    topics: [
      {
        id: "bigo", icon: "⏱️", name: "Big-O Notation", time: "2–3 days",
        why: "Big-O is the language used to compare every data structure and algorithm. Learn it first — you can't judge if your solution is good without it.",
        learn: [
          ["What time complexity means", "Counting operations, not seconds"],
          ["O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)", "Know the growth order from fastest to slowest"],
          ["Space complexity", "Extra memory your algorithm uses"],
          ["Best, worst and average case", "e.g. quicksort's O(n²) worst case vs O(n log n) average"],
          ["Analysing loops and nested loops", "A loop inside a loop usually means O(n²)"],
          ["Analysing recursive calls", "Count the branches × depth of the recursion tree"]
        ],
        practice: [["Analyse complexity of 10 short code snippets", "Easy"]],
        tip: "Don't obsess over formal proofs. Being able to look at code and say 'this is O(n²)' is enough to move on."
      },
      {
        id: "arrays", icon: "📦", name: "Arrays & Strings", time: "3–4 days",
        why: "Arrays are the substrate almost every other structure is built on. Most interview problems start here.",
        learn: [
          ["Array indexing, insertion, deletion", "And their O(n) costs"],
          ["Dynamic arrays (Python list, C++ vector)", "How resizing / amortised O(1) append works"],
          ["2D arrays / matrices", "Row-major traversal, transpose"],
          ["String immutability and slicing", "Language-specific quirks"],
          ["Two pointers technique", "Pair sums, palindrome checks, container with water"],
          ["Sliding window technique", "Fixed and variable-size windows for substring problems"],
          ["Prefix sums", "Range sum queries in O(1) after O(n) preprocessing"],
          ["Kadane's algorithm", "Maximum subarray sum in O(n)"]
        ],
        practice: [
          ["Two Sum", "Easy"],
          ["Best Time to Buy & Sell Stock", "Easy"],
          ["Contains Duplicate", "Easy"],
          ["Longest Substring Without Repeating Characters", "Medium"],
          ["Maximum Subarray (Kadane's)", "Medium"],
          ["Product of Array Except Self", "Medium"]
        ],
        tip: "Sliding window is the #1 pattern in interviews. Do 5–6 sliding window problems until you can spot when to use it instantly."
      }
    ]
  },
  {
    phase: "Phase 2", title: "Linear Structures", time: "Weeks 2–3",
    topics: [
      {
        id: "hash", icon: "🗂️", name: "Hash Tables", time: "2–3 days",
        why: "Highest payoff per hour of study. O(1) average lookup unlocks an enormous number of problems.",
        learn: [
          ["Hash function basics", "How a key becomes an index"],
          ["Handling collisions", "Chaining vs open addressing"],
          ["Hash map vs hash set", "Map stores key→value, set stores unique keys"],
          ["Load factor and resizing", "Why average case is O(1) but worst is O(n)"],
          ["Frequency counting pattern", "Solve anagram / duplicate problems with one pass"],
          ["Grouping with maps", "Group anagrams, group items by a computed key"]
        ],
        practice: [
          ["Valid Anagram", "Easy"],
          ["Group Anagrams", "Medium"],
          ["Top K Frequent Elements", "Medium"],
          ["Longest Consecutive Sequence", "Medium"]
        ],
        tip: "When you see 'find duplicates', 'count occurrences' or 'check membership fast' — a hash map is almost always the answer."
      },
      {
        id: "linkedlist", icon: "🔗", name: "Linked Lists", time: "3–4 days",
        why: "Teaches you pointer manipulation. Many companies still ask linked list problems to test this exact skill.",
        learn: [
          ["Singly linked list from scratch", "Build Node + insert + delete + search yourself"],
          ["Doubly and circular linked lists", "Trade-offs vs singly linked"],
          ["Reversing a linked list", "Iterative AND recursive — classic interview question"],
          ["Fast & slow pointers", "Cycle detection (Floyd's algorithm), finding the middle"],
          ["Merging two sorted lists", "Foundation for merge sort later"],
          ["Finding the k-th node from the end", "Two pointers with a gap of k"],
          ["Array vs linked list comparison", "When to use which and why"]
        ],
        practice: [
          ["Reverse Linked List", "Easy"],
          ["Merge Two Sorted Lists", "Easy"],
          ["Linked List Cycle", "Easy"],
          ["Middle of Linked List", "Easy"],
          ["Remove Nth Node From End", "Medium"],
          ["Reorder List", "Medium"]
        ],
        tip: "Always draw the nodes and arrows on paper before coding pointer manipulation. Visual first, code second."
      },
      {
        id: "stack", icon: "🥞", name: "Stacks", time: "1–2 days",
        why: "LIFO structure behind recursion, undo, parsing and expression evaluation — directly useful for expression-conversion academic work.",
        learn: [
          ["Stack operations and implementation", "push, pop, peek — via array and linked list"],
          ["Balanced parentheses matching", "The classic first stack problem"],
          ["Infix → postfix/prefix conversion", "Directly useful for academics"],
          ["Postfix expression evaluation", "Stack-based evaluation"],
          ["Monotonic stack", "Next greater element, daily temperatures"],
          ["Min stack / stack with extra state", "Design problems"],
          ["Call stack connection", "How function calls use a stack — leads into recursion"]
        ],
        practice: [
          ["Valid Parentheses", "Easy"],
          ["Implement Queue using Stacks", "Easy"],
          ["Min Stack", "Medium"],
          ["Daily Temperatures", "Medium"],
          ["Next Greater Element", "Medium"]
        ],
        tip: "Monotonic stack problems look impossible until you learn the pattern once — then they all feel the same."
      },
      {
        id: "queue", icon: "🚶", name: "Queues & Deques", time: "1–2 days",
        why: "FIFO structure behind BFS, scheduling and buffering. You'll need it immediately when you reach graphs.",
        learn: [
          ["Queue operations and implementation", "enqueue, dequeue — circular array implementation"],
          ["Deque (double-ended queue)", "Both ends can push/pop"],
          ["Circular queue", "Design problem favourite"],
          ["Queue using two stacks", "Amortised analysis"],
          ["Priority queue intro", "Leads into heaps in Phase 4"]
        ],
        practice: [
          ["Implement Circular Queue", "Medium"],
          ["Design Deque", "Medium"],
          ["Number of Recent Calls", "Easy"]
        ],
        tip: "Understand WHY circular queues reuse freed slots — it's a common viva/interview explanation question."
      }
    ]
  },
  {
    phase: "Phase 3", title: "Recursion & Backtracking", time: "Weeks 4–5 ⚠️",
    topics: [
      {
        id: "recursion", icon: "🔄", name: "Recursion", time: "4–5 days",
        why: "THE critical checkpoint. Trees, graphs and dynamic programming all depend on recursion. Do not rush this.",
        learn: [
          ["Base case and recursive case", "Every recursion needs a stopping condition"],
          ["The call stack", "Visualise how frames stack up and return"],
          ["Recursion tree", "Draw it for every recursive function"],
          ["Recursion on arrays/strings", "Subsets, sum problems, check sorted"],
          ["Head vs tail recursion", "And why tail recursion can be optimised"],
          ["Recursion vs iteration", "Converting between them"],
          ["Divide and conquer", "Split problem in half — foundation for merge sort"],
          ["Memoisation intro", "Cache repeated calls — the bridge to DP"]
        ],
        practice: [
          ["Fibonacci (recursive, then memoised)", "Easy"],
          ["Power of a number (fast exponentiation)", "Medium"],
          ["Subsets of an array", "Medium"],
          ["Tower of Hanoi", "Medium"],
          ["Generate all permutations", "Medium"]
        ],
        tip: "Rule of thumb: if you can't draw the recursion tree on paper, you can't code it. Draw first, code second, always."
      },
      {
        id: "backtrack", icon: "🧭", name: "Backtracking", time: "3–4 days",
        why: "Backtracking is recursion + undo. It powers constraint problems and is the pattern behind many classic interview questions.",
        learn: [
          ["Choose → explore → un-choose pattern", "The universal backtracking template"],
          ["Subsets & power set generation", "Include/exclude each element"],
          ["Permutations", "Order matters version of subsets"],
          ["Combination sums", "With and without repetition allowed"],
          ["N-Queens problem", "The classic constraint backtracker"],
          ["Sudoku solver concept", "Grid-based backtracking"],
          ["Pruning strategies", "Cut branches early to avoid exponential blowup"]
        ],
        practice: [
          ["Subsets", "Medium"],
          ["Permutations", "Medium"],
          ["Combination Sum", "Medium"],
          ["Word Search", "Medium"],
          ["N-Queens", "Hard"]
        ],
        tip: "Memorise the template: base case → for each choice → make choice → recurse → UNDO choice. Every backtracking problem fits it."
      }
    ]
  },
  {
    phase: "Phase 4", title: "Trees & Hierarchies", time: "Weeks 6–8",
    topics: [
      {
        id: "bitree", icon: "🌳", name: "Binary Trees", time: "4–5 days",
        why: "The most-asked data structure category in interviews. Every concept here reuses your recursion skills.",
        learn: [
          ["Tree terminology", "Root, leaf, height, depth, subtree, balanced"],
          ["The 4 traversals", "Inorder, preorder, postorder (recursive + iterative) and level-order (BFS with a queue)"],
          ["Height / depth / diameter", "Bottom-up recursion pattern"],
          ["Balanced tree check", "Returning height and validity together"],
          ["Invert / mirror a tree", "Warm-up recursion on trees"],
          ["Lowest Common Ancestor", "Both the general and BST versions"],
          ["Path sum problems", "Root-to-leaf, any path, maximum path sum"],
          ["Serialize / deserialize", "Rebuild a tree from traversal output"]
        ],
        practice: [
          ["Invert Binary Tree", "Easy"],
          ["Maximum Depth of Binary Tree", "Easy"],
          ["Same Tree", "Easy"],
          ["Level Order Traversal", "Medium"],
          ["Validate Binary Search Tree", "Medium"],
          ["Diameter of Binary Tree", "Medium"],
          ["Lowest Common Ancestor", "Medium"],
          ["Binary Tree Maximum Path Sum", "Hard"]
        ],
        tip: "Most tree problems = 'do something to left subtree, do something to right subtree, combine'. Learn to see problems this way."
      },
      {
        id: "bst", icon: "🌲", name: "Binary Search Trees", time: "2–3 days",
        why: "BSTs give O(log n) search — the bridge between simple arrays and advanced balanced trees.",
        learn: [
          ["BST property", "Left < node < right, for EVERY subtree"],
          ["Insert / delete / search", "Delete with 0, 1 and 2 children is the tricky part"],
          ["Inorder traversal = sorted order", "Very common viva/exam point"],
          ["Building a BST from sorted array", "Pick middle element as root"],
          ["BST vs hash map", "When ordered data matters, BST wins"],
          ["Why unbalanced = O(n)", "Motivation for AVL/Red-Black trees (know the concept)"]
        ],
        practice: [
          ["Search in a BST", "Easy"],
          ["Insert into a BST", "Medium"],
          ["Delete Node in a BST", "Medium"],
          ["Kth Smallest in BST", "Medium"]
        ],
        tip: "Deleting a node with two children: replace with inorder successor (smallest in right subtree). Favourite exam question."
      },
      {
        id: "heap", icon: "⛰️", name: "Heaps & Priority Queues", time: "2 days",
        why: "Small topic, huge payoff. Top-K, scheduling and Dijkstra all depend on heaps.",
        learn: [
          ["Min-heap vs max-heap", "Complete binary tree stored in an array"],
          ["Insert and extract-min (sift up/down)", "Both O(log n)"],
          ["Building a heap from an array", "O(n) — faster than n inserts"],
          ["Array index formulas", "Parent = (i−1)/2, children = 2i+1, 2i+2"],
          ["Heap sort concept", "O(n log n), in-place"],
          ["Top-K pattern", "Keep a heap of size k — 'kth largest element' problems"],
          ["Two heaps pattern", "Median of a data stream"]
        ],
        practice: [
          ["Kth Largest Element in Array", "Medium"],
          ["K Closest Points to Origin", "Medium"],
          ["Top K Frequent Elements (heap version)", "Medium"],
          ["Find Median from Data Stream", "Hard"]
        ],
        tip: "For 'k largest' use a MIN-heap of size k (not a max-heap) — the counter-intuitive part everyone gets wrong at first."
      },
      {
        id: "trie", icon: "🔤", name: "Tries (Prefix Trees)", time: "2 days",
        why: "The go-to structure for autocomplete, spellcheck and prefix-matching problems.",
        learn: [
          ["Trie node structure", "Children map/array + is_end flag"],
          ["Insert / search / startsWith", "The three core operations"],
          ["Prefix search & autocomplete", "Walk the trie, then collect subtree words"],
          ["Word search with wildcard", "'.' matching like regex"],
          ["When to use a trie vs hash set", "Prefix queries are the giveaway"]
        ],
        practice: [
          ["Implement Trie", "Medium"],
          ["Design Add and Search Words", "Medium"],
          ["Word Search II", "Hard"]
        ],
        tip: "A trie looks scary but is just a tree of characters. Implement it once by hand and it becomes one of your easiest tools."
      }
    ]
  },
  {
    phase: "Phase 5", title: "Graphs, Sorting & Search", time: "Weeks 9–11",
    topics: [
      {
        id: "graphbasics", icon: "🕸️", name: "Graph Basics & Traversal", time: "4–5 days",
        why: "BFS and DFS are the two engines behind nearly every graph problem — and they need your recursion and queue skills first.",
        learn: [
          ["Graph representations", "Adjacency list (use this) vs adjacency matrix vs edge list"],
          ["Directed vs undirected, weighted vs unweighted", "And cyclic vs acyclic"],
          ["BFS (breadth-first search)", "Queue-based, gives shortest path in unweighted graphs"],
          ["DFS (depth-first search)", "Recursive and iterative (stack) versions"],
          ["Connected components", "Run DFS/BFS from every unvisited node"],
          ["Grids as graphs", "Treat each cell as a node, neighbours = 4 directions"],
          ["Number of islands pattern", "The classic grid-DFS problem"],
          ["Cycle detection", "DFS with visited states in directed graphs"]
        ],
        practice: [
          ["Number of Islands", "Medium"],
          ["Flood Fill", "Easy"],
          ["Max Area of Island", "Medium"],
          ["Clone Graph", "Medium"],
          ["Course Schedule (cycle detection)", "Medium"]
        ],
        tip: "Grid problems = graph problems in disguise. Once you learn the 4-direction neighbour loop, half of graph practice becomes routine."
      },
      {
        id: "graphadv", icon: "🛰️", name: "Advanced Graphs", time: "3–4 days",
        why: "Shortest paths, dependency ordering and connectivity — the problems that separate intermediate from advanced.",
        learn: [
          ["Topological sort (Kahn's algorithm)", "Ordering with dependencies; prerequisite problems"],
          ["Dijkstra's algorithm", "Shortest path with non-negative weights, using a priority queue"],
          ["Union-Find (Disjoint Set Union)", "Find + union with path compression and union by rank"],
          ["Detecting cycles with Union-Find", "Undirected graphs"],
          ["Number of connected components", "Both via DFS and via Union-Find"],
          ["Bellman-Ford concept", "Handles negative weights — know the idea"],
          ["Minimum Spanning Tree (Kruskal/Prim)", "Concept + how Union-Find powers Kruskal"]
        ],
        practice: [
          ["Course Schedule II (topological sort)", "Medium"],
          ["Network Delay Time (Dijkstra)", "Medium"],
          ["Number of Provinces (union-find)", "Medium"],
          ["Redundant Connection", "Medium"]
        ],
        tip: "Union-Find looks like magic the first time. Code it once with path compression and you'll reuse it in dozens of problems."
      },
      {
        id: "sorting", icon: "📊", name: "Sorting Algorithms", time: "3–4 days",
        why: "Merge sort and quicksort specifically cement divide-and-conquer recursion — and sorting questions are standard in exams and interviews.",
        learn: [
          ["Bubble, selection, insertion sort", "O(n²) basics — insertion sort is the one to actually remember"],
          ["Merge sort", "Divide, sort halves, merge. Stable, O(n log n) always"],
          ["Quicksort", "Partition around a pivot. O(n log n) average, O(n²) worst"],
          ["Partitioning (Lomuto / Hoare)", "The heart of quicksort, also used in quickselect"],
          ["Heap sort", "Build heap + repeatedly extract max"],
          ["Counting & bucket sort", "O(n) when data range is limited — non-comparison sorts"],
          ["Stability of sorts", "Which sorts preserve order of equal keys"],
          ["Comparison table", "Time + space complexity of every sort"]
        ],
        practice: [
          ["Implement merge sort from scratch", "Medium"],
          ["Implement quicksort + partition", "Medium"],
          ["Sort Colors (Dutch national flag)", "Medium"],
          ["Kth Largest (quickselect)", "Medium"]
        ],
        tip: "Be able to write merge sort and quicksort from memory on paper — a very common university lab exam and interview task."
      },
      {
        id: "binsearch", icon: "🎯", name: "Binary Search", time: "2 days",
        why: "O(log n) search on anything monotonic — including answers, not just sorted arrays.",
        learn: [
          ["Classic binary search", "Loop and recursive versions, and off-by-one pitfalls"],
          ["Search in rotated sorted array", "The famous follow-up"],
          ["First and last occurrence", "Left-most / right-most binary search"],
          ["Binary search on the ANSWER", "'Minimum capacity to ship in D days' style problems"],
          ["Search in 2D matrix", "Treating a matrix as one sorted array"]
        ],
        practice: [
          ["Binary Search", "Easy"],
          ["First Bad Version", "Easy"],
          ["Search in Rotated Sorted Array", "Medium"],
          ["Koko Eating Bananas", "Medium"]
        ],
        tip: "Binary search bugs live in the boundary conditions. Memorise one clean template (while lo < hi style) and use it everywhere."
      }
    ]
  },
  {
    phase: "Phase 6", title: "Dynamic Programming", time: "Weeks 12–14 🔥",
    topics: [
      {
        id: "dp1", icon: "🧩", name: "DP Fundamentals", time: "4–5 days",
        why: "The hardest topic in DSA — recursion plus memoisation. Expect it to feel slow; that's normal.",
        learn: [
          ["Overlapping subproblems", "What makes a problem a DP problem"],
          ["Top-down (memoisation)", "Recursive + cache — the easier way to start"],
          ["Bottom-up (tabulation)", "Iterative table filling — the faster way"],
          ["State definition", "'dp[i] = best answer using first i items' — the real skill"],
          ["Transition / recurrence relation", "How dp[i] relates to earlier states"],
          ["Space optimisation", "Rolling arrays: O(n) → O(1) space"],
          ["1D DP classics", "Climbing stairs, house robber, coin change"],
          ["Fibonacci as first DP example", "The bridge from recursion to DP"]
        ],
        practice: [
          ["Climbing Stairs", "Easy"],
          ["House Robber", "Medium"],
          ["Coin Change", "Medium"],
          ["Longest Increasing Subsequence", "Medium"],
          ["Word Break", "Medium"]
        ],
        tip: "Solve every DP problem BOTH ways: first top-down with memoisation (easier to think of), then convert to bottom-up tabulation."
      },
      {
        id: "dp2", icon: "🧮", name: "2D & Advanced DP", time: "4–5 days",
        why: "Grid and string DP covers most remaining interview DP questions, including edit distance — a top-5 classic.",
        learn: [
          ["Grid DP", "Unique paths, minimum path sum — dp[i][j] patterns"],
          ["Knapsack (0/1)", "The single most important DP pattern"],
          ["Unbounded knapsack", "Coin change II — items reusable"],
          ["Longest Common Subsequence (LCS)", "Foundation of string DP"],
          ["Edit Distance", "LCS's famous cousin"],
          ["DP on strings", "Palindrome substrings, partitions"],
          ["DP vs greedy", "When greedy fails and DP is required"]
        ],
        practice: [
          ["Unique Paths", "Medium"],
          ["Minimum Path Sum", "Medium"],
          ["Partition Equal Subset Sum", "Medium"],
          ["Longest Common Subsequence", "Medium"],
          ["Edit Distance", "Medium"],
          ["Longest Palindromic Substring", "Medium"]
        ],
        tip: "Knapsack alone has dozens of variations. Once you deeply understand 0/1 knapsack, see how coin change, partition and subset-sum are all knapsack in disguise."
      }
    ]
  },
  {
    phase: "Phase 7", title: "Advanced Topics & Mastery", time: "Ongoing",
    topics: [
      {
        id: "advanced", icon: "🏆", name: "Advanced Structures", time: "1–2 weeks",
        why: "Beyond interview basics — for competitive programming, depth in academics, and standing out.",
        learn: [
          ["Segment trees", "Range queries with updates in O(log n)"],
          ["Fenwick tree (Binary Indexed Tree)", "Simpler alternative for prefix sums with updates"],
          ["Sparse table concept", "Immutable range queries"],
          ["AVL / Red-Black trees (concepts)", "Self-balancing BSTs — rotations conceptually"],
          ["B-Trees concept", "How databases and file systems store data"]
        ],
        practice: [
          ["Range Sum Query — Mutable", "Medium"],
          ["Implement Fenwick tree", "Medium"]
        ],
        tip: "This tier is optional for interviews but very valuable for coursework, competitive programming and understanding databases."
      },
      {
        id: "greedy", icon: "🤏", name: "Greedy Algorithms", time: "2–3 days",
        why: "Greedy problems are short to code but the skill is proving to yourself that the greedy choice is safe.",
        learn: [
          ["Greedy choice property", "When a local best choice gives a global best answer"],
          ["Interval scheduling", "Max non-overlapping intervals — sort by end time"],
          ["Jump game / gas station patterns", "Reachability greedily"],
          ["Huffman coding concept", "Greedy in data compression"],
          ["Greedy vs DP decision", "Try greedy first, fall back to DP if the greedy choice can be proven wrong"]
        ],
        practice: [
          ["Assign Cookies", "Easy"],
          ["Jump Game", "Medium"],
          ["Non-overlapping Intervals", "Medium"],
          ["Gas Station", "Medium"]
        ],
        tip: "For interval problems, 'sort by end time' solves a shocking number of questions. Try it first every time."
      },
      {
        id: "interview", icon: "🎯", name: "Interview & Exam Mode", time: "2–3 weeks",
        why: "Knowing topics ≠ solving them under pressure. This final phase converts knowledge into performance.",
        learn: [
          ["Pattern recognition drills", "Given a new problem, name the pattern before solving"],
          ["Timed solving", "1 easy in 15 min, 1 medium in 30 min"],
          ["Complexity explanation practice", "State the trade-offs out loud while solving"],
          ["Company-specific question sets", "Focus on the companies you target"],
          ["Revision of weak topics", "Re-solve problems you failed, with spacing"],
          ["Paper coding practice", "For university lab exams — no autocomplete"]
        ],
        practice: [
          ["Solve 50 mixed problems under time pressure", "Medium"],
          ["2 mock interviews with a friend", "Hard"]
        ],
        tip: "Re-solve old failed problems from a week later. Retention beats volume — one revisited problem teaches more than three new ones."
      }
    ]
  }
];
