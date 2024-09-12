const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doReq() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("HASH:", Date.now() - start);
  });
}

doReq();

fs.readFile("multitask.js", "utf8", () => {
  console.log("fs:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();

// Threadpool
// FS, Crypto

// OS
// HTTPS

// they are all starting at the same time

// https: request also depend on the internet obvsly

// reading file flow
// node js first -> get some stats on the file (require on HD access)
// HD accessed, stats returned (pause)
// nodejs requests to read file
// hd access, file contents streamed back to app (pause)
// node returns file contents to us




// so whats going on...
// HTTPs modules not be in thread pool but use OS (doest nt care about whats going with threadpool)

// first fs, doHash, doHash, doHash, assign to the threads in thread pool
// now they are all working,
// fs started the flow of reading file as we mentioned above
// when fs accessing the HD, take time so wait
// then 5th doHash will assign to frist thread 1 (which thread assigned by fs before)
// so first 2nd doHash first done from thread 2
//  so fs will assign to thread 2
// then 'fs' work done and then 3 doHash completed their work...


// call flow
// Https
// DOHash
// FS
// DOHash
// DOHash
// DOHash

// if inc the threadpool size to 5 then
// FS
// Https
// DOHash
// DOHash
// DOHash
// DOHash


// if dec the threadpool size to 1 then
// Https
// DOHash
// DOHash
// DOHash
// DOHash
// FS



