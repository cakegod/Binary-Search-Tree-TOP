class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  root: TreeNode | null;

  constructor(arr: number[]) {
    this.root = this.buildTree(arr);
  }

  buildTree(
    arr: number[] = [],
    start = 0,
    end = arr.length - 1,
  ): TreeNode | null {
    if (arr.length === 0) {
      return null;
    }

    if (start > end) {
      return null;
    }

    const middle = Math.floor((start + end) / 2);
    const node = new TreeNode(arr[middle]);

    node.left = this.buildTree(arr, start, middle - 1);
    node.right = this.buildTree(arr, middle + 1, end);

    return node;
  }

  insert(value: number, node?: TreeNode | null) {
    if (node === undefined) {
      node = this.root;
    }

    if (node === null) {
      return new TreeNode(value);
    }

    if (node.value < value) {
      node.left = this.insert(value, node.left);
    } else if (node.value > value) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteNode(value, node?) {
    // Set initial node to root
    if (node === undefined) {
      node = this.root;
    }

    if (node === null) {
      return null;
    }

    if (node.value === value) {
      // If leaf node then simply delete
      if (node.left === null && node.right === null) {
        return (node = null);
      }

      node;
      // If only one child then copy the value of the non-null child to current node & delete child.
      if (node.right !== null && node.left === null) {
        node.value = node.right.value;
        node.right = null;
      } else if (node.left !== null && node.right === null) {
        node.value = node.left.value;
        node.left = null;
      }

      // Two children
      if (node.left !== null && node.right !== null) {
        // Get the inorder successor value
        let successor = this.findInorderSucc(node.right).value;
        // Delete the inorder successor
        this.deleteNode(successor);
        // Copy the value to the node
        node.value = successor;
      }
    }

    if (value > node.value) {
      node;
      node.right = this.deleteNode(value, node.right);
    } else if (value < node.value) {
      node.left = this.deleteNode(value, node.left);
    }

    return node;
  }

  findInorderSucc(node) {
    if (!node.left) return node;
    return this.findInorderSucc(node.left);
  }

  find(search: number, node?: TreeNode | null): TreeNode | null {
    if (node === undefined) {
      node = this.root;
    }

    if (node === null) {
      return null;
    }

    if (node.value === search) {
      return node;
    }

    if (node.value > search) {
      return this.find(search, node.left);
    } else if (node.value < search) {
      return this.find(search, node.right);
    }
    return null

  }
}

const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
