class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;               
    }
}

class Queue {
    
    constructor() {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    get length() {
        return this._length;
    }

    enqueue(data) {
        let node = new ListNode(data);
        if (this._head === null) {
            this._head = node;
            this._tail = node;
            this._head.next = this._tail;
        } else {
            this._tail.next = node;
            this._tail = this._tail.next;            
        }
        this._length++;
    }
    
    dequeue() {
        if (this._head !== null) {
            var temp = this._head;
            this._head = this._head.next;
            this._length--;

            return temp;
        }
    }

    isEmpty() {
        return this._length === 0;
    }

    printQueue() {
        var temp = this._head;
        while (temp) {
            console.log(temp.data);
            temp = temp.next;
        }
    }
} 

module.exports = Queue;