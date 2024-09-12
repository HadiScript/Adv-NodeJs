process.env.UV_THREADPOOL_SIZE = 1;
// make one thread available in threadpool;

const cluster = require("cluster");

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // every children has their own thread pool
} else {
  const crypto = require("crypto");
  const express = require("express");

  const app = express();

  app.get("/", (req, res) => {
    // change
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hello");
    });
  });

  app.get("/fast", (req, res) => res.send("this is fast"));

  app.listen(5000, () => console.log("listening at 5000 port."));
}

// having 1 thread in threadpool (every cluster have his own threads so we have one thread which have 1 thread)
// one req take 1 sec other req take 2 sec (both request started at the same time)

// now take 2 cluster by take 2 ford (2 children)
// both req started at same time, almost they will take same time 1sec to completed (like a parallel)
// good!

// now takking 6 cluster
// both started at the same time.
// butttt, making all request i mean (having 6 cluster making 6 request to each cluster, did the same things when we had two cluster)
// all request are taking 3.5sec, taking long time
// becouse CPU bounce arround all the request
// will not too good when we have high computational cal to do.

// Solution ????
// Making cluster just 2,
// and now making 6 request, at the same
// fatest req in just 1 sec

// how?
// 6 request started at the same time
// first two request go to their thread so assing to process mean getting one CPU (dual core), so two request get their CPU so CPU will not bounce
// once they completed then other two request take the same process to completed
// now CPU is not bouncing arround the request
// Number CPU is mattered!!!


// Fully features Cluster solutions
// Go with PM2 Cli for production cause having good master to check the health of cluster
// pm2.io managing cluster health if any cluster will crushes it will restarted for you


// ** remaining in index3