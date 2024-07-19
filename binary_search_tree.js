class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// function to build a balanced BST

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null;

  let mid = Math.floor((start + end) / 2);
  const node = new Node(arr[mid]);

  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);

  return node;
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
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
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const tree = new Tree(array);
console.log(tree);
