let has = {}; // vue源码里有的时候去重用的是set 有的时候用的是对象来实现的去重
let queue = [];

// 这个队列是否正在等待更新
function flushSchedulerQueue() {
  for (let i = 0; i < queue.length; i++) {
    queue[i].run();
  }
  queue = [];
  has = {};
}

let callbacks = []; // [flushSchedulerQueue,fn1,fn2]
export function queueWatcher(watcher) {
  const id = watcher.id;
  if (has[id] == null) {
    has[id] = true; // 如果没有注册过这个watcher，就注册这个watcher到队列中，并且标记为已经注册
    queue.push(watcher);
    // 每次都会把它清空状态 但是queue数组中一直在增加,
    // 所以相当于flushSchedulerQueue只有一次被加进callbacks中了
    callbacks = [];
     nextTick(flushSchedulerQueue); // flushSchedulerQueue  调用渲染watcher
  }
}

function flushCallbacksQueue() {
  callbacks.forEach(fn => fn());
}

export function nextTick(fn) {
  callbacks.push(fn);
  // true  事件环的概念 promise mutationObserver setImmediate setTimeout
  setTimeout(() => {
    flushCallbacksQueue();
  }, 0);

}
