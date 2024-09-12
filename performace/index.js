const cluster = require("cluster");

// isMaster always to be true
// console.log(cluster.isMaster);

// first it checks, this file is being executed in master mode?
if (cluster.isMaster) {
  // if it is! then we enter here
  // it makes index to be executed again but in *Child Mode*
  cluster.fork();
  // fork basically make its child

  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // now it will make 4 child more
} else {
  // Am a child, its a server and do nothing else...

  const express = require("express");

  const app = express();

  // SINGLE THREAD CAN TAKE MORE TIME** EXAMPLES
  // CLUSTERING CAN RESOLVE THIS

  // purpose to use mnuch more CPU resources for some sec (durations)
  function doWork(duration) {
    const start = Date.now();

    while (Date.now() - start < duration) {}
    // in this duration eventloop will not do anything anything...
  }

  app.get("/", (req, res) => {
    doWork(5000); // 5 sec work; // done in event loop;
    //  with above function we are breaking the flow

    // if we make request from on browser to this api which take 5 sec
    // and from other browser if we make request to this request then it will take more than 5 sec;

    res.send("Hello");
  });

  app.get("/fast", (req, res) => res.send("this is fast"));

  app.listen(5000, () => console.log("listening at 5000 port."));
}
// nodemon is not too mush suitable for clustering

// Summary
// let say we are having 2 routes
// 1 route take 5 sec to send  back res and other route will not take any extra time

// if we make a req to route 1 (which take 5 sec) (then we can not do any other thing, first this route give res then other thing will be happen )
// and then make a req to route 2 at the same time

// so both route will take much more time

// by the clustring we basically making many servers by adding line cluster.fork() -> making child
// it can resolve the issue
// after clustering if we make a req to both routes and now route 2 give me res quickly

// But make more and more children (by cluster.fork()) will make some disAdvantages

// DisAdvantages
// ** remaining in index2.js

// important
// performance can be done by cluster (recommended) and worker thread
