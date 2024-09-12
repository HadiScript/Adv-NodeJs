// updatiing the threadpool by env
// process.env.UV_THREADPOOL_SIZE = 2;
//now we are saying whenever libuv create threadpool, it till take 2 tread in a thread poll

// process.env.UV_THREADPOOL_SIZE = 5;
// //now we are saying whenever libuv create threadpool, it till take 2 tread in a thread poll

const crypto = require("crypto");

const start = Date.now();
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("1:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("2:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("3:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("4:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("5:", Date.now() - start);
});

// both functions started at the same time.
// if nodejs truely single thread then 1: will take almost 1 sec
// 2: will take 1 sec
// so time diff should be 2sec
// but its not, it take 1 second

// reality is-> both program started at the same time, both take the same time
// becouse at the CPP side we have libuv and it is having thread pool
// any higher computational calculation (live pbkdf2) occure in thread pool so
// in thread pool we are having the 4 threads,

// now we take the 5 higher computation calculcation
// 4 func - (assign the one thread in thread poll then accordingly they will assign to the core (2 thread assign to single core, and other 2 thread will asign to other core (core means CPU) )) will start at the same time
// once first 4 func completed then 5th function will assign
// but 5th function start when

// CUSTOMIZE THE THREAD POOL BY 2
// now we are saying when ever libuv create thread pool just create two thread in threadpool
// now first 2 function assign to 2 thread and then other 2 funct will assign and so on...

// CUSTOMIZE THE THREAD POOL BY 5
// now we are saying when ever libuv create thread pool just create two thread in threadpool
// now first 5 function assign to 5 thread then they will assign to the core

// console.log(process.env.UV_THREADPOOL_SIZE)
// we can run file like this also
// UV_THREADPOOL_SIZE=120 node threads.js

// QUESTIONS:
// can we use threadpool for JS code?
// YES, we can write custom JS that use the thread pool

// what func in nodejs std lib use the threadpool?
//  all 'fs' and crypto stuff, but depend on the Operating sys

// how does this threadpool stuff fit into the eventloop?
// task running the threadpool and the 'pendingOperation []' the code example
// inshort evenloop see if there any task panding....
