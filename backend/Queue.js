class Queue {
    constructor() {
      this.items = [];
    }
  
    // Enqueue: Add an element to the queue
    enqueue(element) {
      this.items.push(element);
    }
  
    // Dequeue: Remove and return the front element from the queue
    dequeue() {
      if (this.isEmpty()) {
        return "Queue is empty";
      }
      return this.items.shift();
    }
  
    // Front: Return the front element without removing it
    front() {
      if (this.isEmpty()) {
        return "Queue is empty";
      }
      return this.items[0];
    }
  
    // isEmpty: Check if the queue is empty
    isEmpty() {
      return this.items.length === 0;
    }
  
    // size: Return the size of the queue
    size() {
      return this.items.length;
    }
  
    // Print: Print the elements of the queue
    print() {
      console.log(this.items.join(' '));
    }
  }
  
const HighPriority = new Queue();
const MediumPriority = new Queue();
const LowPriority = new Queue();
 module.exports = {Queue, HighPriority, MediumPriority, LowPriority};
  