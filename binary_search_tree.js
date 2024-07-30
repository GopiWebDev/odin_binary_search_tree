class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// function to build a balanced BST

class Tree {
  constructor(arr) {
    if (arr) {
      this.root = this.buildTree(arr);
    } else {
      this.root = null;
    }
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  insert(value) {
    let newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (value < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (value > current.val) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        break;
      }
    }
    return this;
  }

  getRoot() {
    return this.root;
  }

  deleteItem(value) {
    if (this.root === null) {
      return false;
    }

    let current = this.root;
    while (current) {
      if (current.val > value) current = current.left;
      else if (current.val < value) current = current.right;
      else if (current.left === null && current.right === null) {
        let removedNode = current;
        current.val = null;
        return removedNode;
      } else if (current.left === null) {
        let removedNode = current.right;
        current = current.right;
        return removedNode;
      } else if (current.right === null) {
        let removedNode = current.left;
        current = current.left;
        return removedNode;
      } else {
        const temp = current.val;
        current.val = current.right.val;
        current.right.val = temp;
        current = current.right;
      }
    }
    return false;
  }

  find(value) {
    if (this.root === null) return false;

    let current = this.root;
    let found = false;

    while (current && !found) {
      if (value > current.val) {
        current = current.left;
      } else if (value < current.val) {
        current = current.right;
      } else {
        return true;
      }
    }
    return false;
  }

  levelOrder(callback) {
    if (!this.root) return [];

    let queue = [];
    let result = [];

    queue.push(this.root);

    while (queue.length !== 0) {
      const node = queue.shift();
      result.push(node.val);

      if (callback) callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (!callback) throw new Error('Callback not provided');
    return result;
  }

  inOrder(callback) {
    let data = [];
    let current = this.root;

    function traverse(node) {
      if (node.left) traverse(node.left);
      callback(node.val);
      data.push(node.val);
      if (node.right) traverse(node.right);
    }

    traverse(current);
    if (!callback) throw new Error('Callback not provided');
    return data;
  }

  preOrder(callback) {
    let data = [];
    let current = this.root;

    function traverse(node) {
      callback(node.val);
      data.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(current);
    if (!callback) throw new Error('Callback not provided');
    return data;
  }

  postOrder(callback) {
    let data = [];
    let current = this.root;

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      callback(node.val);
      data.push(node.val);
    }

    traverse(current);
    if (!callback) throw new Error('Callback not provided');
    return data;
  }

  height(node) {
    if (node === null) return 0;

    let leftNode = this.height(node.left);
    let rightNode = this.height(node.right);

    return Math.max(leftNode, rightNode) + 1;
  }

  depth(node) {
    let depth = 0;
    let current = this.root;

    while (current !== null && current !== node) {
      if (node.val < current.val) {
        current = current.left;
      } else if (node.val > current.val) {
        current = current.right;
      }
      depth++;
    }

    if (current === null) {
      throw new Error('Node not found');
    }
    return depth;
  }

  isBalanced(root = this.root) {
    if (root === null) return true;

    let left = this.height(root.left);
    let right = this.height(root.right);

    if (
      Math.abs(left - right) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    ) {
      return true;
    }

    return false;
  }

  rebalance() {
    let sortedArray = this.inOrder(function () {});
    this.root = this.buildTree(sortedArray);
    return this;
  }
}

// Create a binary search tree from an array of random numbers < 100.
const randomNumbers = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
  79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
  98,
];
const tree = new Tree(randomNumbers);
// Confirm that the tree is balanced by calling isBalanced.
console.log('Is the tree balanced?');
console.log(tree.isBalanced()); // true

// Print out all elements in level, pre, post, and in order.
console.log('Print all elements in levelOrder');
console.log(tree.levelOrder(function () {}));

console.log('Print all elements in preOrder');
console.log(tree.preOrder(function () {}));

console.log('Print all elements in postOrder');
console.log(tree.postOrder(function () {}));

console.log('Print all elements in inOrder');
console.log(tree.inOrder(function () {}));

// Unbalance the tree by adding several numbers > 100.
tree.insert(100);
tree.insert(101);

console.log('Added 2 more numbers to unbalance the tree');
console.log('Is the tree balanced now?');
console.log(tree.isBalanced());

// Balance the tree by calling rebalance.
tree.rebalance();

console.log('Called rebalance function. Is the tree balanced now?');
console.log(tree.isBalanced());
// Print out all elements in level, pre, post, and in order.
console.log('Print all elements in levelOrder');
console.log(tree.levelOrder(function () {}));

console.log('Print all elements in preOrder');
console.log(tree.preOrder(function () {}));

console.log('Print all elements in postOrder');
console.log(tree.postOrder(function () {}));

console.log('Print all elements in inOrder');
console.log(tree.inOrder(function () {}));
