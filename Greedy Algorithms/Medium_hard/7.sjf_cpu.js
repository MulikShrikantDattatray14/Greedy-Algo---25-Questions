class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(element) {
    this.heap.push(element);
    this.heapifyUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    const min = this.heap[0];
    const lastElement = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastElement;
      this.heapifyDown();
    }

    return min;
  }

  peek() {
    return this.isEmpty() ? null : this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex][0] < this.heap[parentIndex][0]) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestChildIndex = currentIndex;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex][0] < this.heap[smallestChildIndex][0]
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex][0] < this.heap[smallestChildIndex][0]
      ) {
        smallestChildIndex = rightChildIndex;
      }

      if (smallestChildIndex !== currentIndex) {
        this.swap(currentIndex, smallestChildIndex);
        currentIndex = smallestChildIndex;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}
//https://www.youtube.com/watch?v=9PDUOx4MtKo
function compare(a, b) {
  if (a[1] === b[1]) {
    if (a[2] === b[2]) return a[0] - b[0];
    else return a[2] - b[2];
  }
  return a[1] - b[1];
}

let v = [
  [1, 6, 8],
  [2, 8, 4],
  [3, 3, 7],
  [4, 7, 8],
];

let ans = [];
v.sort(compare);

let pq = new MinHeap();

pq.insert([v[0][2], v[0][1], v[0][0]]);
let i = 1;
let currentTime = 0;

while (!pq.isEmpty()) {
  let min = pq.extractMin();
  let burstTime = min[0];
  let id = min[2];
  ans.push(id);
  currentTime = currentTime + burstTime;

  while (true) {
    if (i < v.length && v[i][1] <= currentTime) {
      pq.insert([v[i][2], v[i][1], v[i][0]]);
      i++;
    } else {
      break;
    }
  }
}

for (let i = 0; i < ans.length; i++) {
  console.log(ans[i] + " ");
}
