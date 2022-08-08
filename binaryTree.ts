class TreeNode {
  value: number;
  left: TreeNode;
  right: TreeNode;

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

  buildTree(arr: number[] = [], start = 0, end = arr.length - 1): TreeNode | null {

    if (arr.length === 0) {
      return null
    }

    if (start > end) {
      return null
    }

    const middle = Math.floor((start + end) / 2)
    const node = new TreeNode(arr[middle])

    node.left = this.buildTree(arr, start, middle - 1);
    node.right = this.buildTree(arr, middle + 1, end)

    return node;
  }

  insert(value: number, position?: TreeNode | null) {

    if (position === undefined) {
      position = this.root;
    }

    if (position === null) {
      return new TreeNode(value)
    }

    if (position.value < value) {
      position.left = this.insert(value, position.left)
    } else if (position.value > value) {
      position.right = this.insert(value, position.right)
    }

    return position
  }

  deleteNode(value, position) {

    if (position === undefined) {
      position = this.root
    }

    if (position === null) {
      return null
    }

    if (position.value > value) {
      position.left = this.deleteNode(value, position.left)
    } else if (position.value < value) {
      position.right = this.deleteNode(value, position.right)
    }

    if (position.value === value) {
      if (position.left === null && position.right === null) {
        return position = null
      }
      if (position.left === null) {
        return position.right
      } else if (position.right === null) {
        return position.left
      }

    }

    return position
  }


  find(search: number, position?: TreeNode | null): TreeNode | null {

    if (position === undefined) {
      position = this.root
    }

    if (position === null) {
      return null
    }

    if (position.value === search) {
      return position
    }

    if (position.value > search) {
      return this.find(search, position.left)
    } else if (position.value < search) {
      return this.find(search, position.right)
    }
  }
}


const tree = new Tree([1, 2, 3, 4, 5, 6, 7])