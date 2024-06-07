class LinkedList {
  constructor(head=null) {
    this.head = head;
  }

  iterate(callback) {
    let count = 0;
    let temp = this.head;

    while (temp !== null) {
      const result = callback(temp, count);

      if (result === true) {
        return temp;
      }

      ++count;
      temp = temp.next;
    }

    return this.head;
  }

  // print each node's value on its own line
  // use your iterate method to be DRY! Don't get caught in the code rain, brrr.
  print() {
    this.iterate(node => console.log(node.value))
  }

  // find the node with the target value and return it
  // if not found return null, use your iterate method to be DRY!
  find(target) {
    let answer = null
    this.iterate(node => {
      if (node.value === target) {
        answer = node
      }
    })
    return answer
  }

  // add the node to the start of the list, no nodes should be removed
  addFirst(node) {
    let temp = this.head
    this.head = node
    node.next = temp
  }

  // add node to end of list, no nodes should be removed
  // you may wish to use the iterate method
  addLast(node) {
    let tail = null
    if (this.head) {
      this.iterate(node => {
        if (!node.next) {
          tail = node
        }
      })
      tail.next = node
    } else {
      this.head = node
    }
  }

  // remove the first Node in the list and update head
  // and return the removed node
  removeFirst() {
    if (this.head) {
      let temp = this.head
      this.head = this.head.next
      return temp
    } else {
      return null
    }
  }

  // remove the tail node, iterate may be helpful
  // return the node you just removed
  removeLast() {
    if (this.head) {
      let tail;
      this.iterate(node => {
        if (!node.next.next) {
          tail = node.next
          node.next = null
        }
      })
      return tail
    } else {
      return null
    }
  }

  // replace the node at the given index with the given node
  replace(idx, node) {
    if (idx === 0) {
      this.removeFirst();
      this.addFirst(node);
      return node;
    }

    this.iterate((currNode, count) => {
      if (count === idx - 1) {
        node.next = currNode.next.next;
        currNode.next = node;

        return true;
      }
    });

    return node;
  }


  // insert the node at the given index
  // no existing nodes should be removed or replaced
  insert(idx, node) {
    if (idx === 0) {
      this.addFirst(node)
      return node;
    }
    let lastNode;
    this.iterate((n, count) => {
      if (count === idx) {
        lastNode.next = node
        node.next = n
        return true
      } else {
        lastNode = n
      }
    })
    this.addLast(node)
    return node
  }

  // remove the node at the given index, and return it
  remove(idx) {
    let counter = 0;
    let lastNode;
    let answer;
    this.iterate(n => {
      if (lastNode) {
        lastNode.next = n
      }
      if (counter !== idx) {
        lastNode = n
      } else {
        answer = n
      }
      counter++;
    })
    return answer
  }

  clear() {
    this.head = null
  }
}

class Node {
  constructor(value=null, next=null) {
    this.value = value;
    this.next = next;
  }
}

if (require.main === module) {
  // add your own tests in here
  
}

module.exports = {
  Node, LinkedList
};
