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
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const tree = new Tree(array);
