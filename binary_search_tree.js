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
    this.root = this.buildTree(arr);
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
    if (node === null) return -1;

    let leftNode = this.height(node.left);
    let rightNode = this.height(node.right);

    return Math.max(leftNode, rightNode) + 1;
  }

  depth(node) {
    let depth = 0;
    let current = node;

    while (current !== this.root) {
      if (node.val < current.val) {
        current = current.left;
      } else if (node.val > current.val) {
        current = current.right;
      }
      depth++;
    }
    return depth;
  }

  isBalanced(){
    
  }
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const tree = new Tree(array);
console.log(tree);
