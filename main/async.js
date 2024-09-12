const https = require("https");

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

doReq();
doReq();
doReq();
doReq();
doReq();
doReq();
doReq();


// almost they take the same time, 
// we are not touching the thread pool in this can, becourse libuv do not any low level code
// handle by the OS (networking task)

// QUESTIONS
// 1_ what func in node std (standard) lib use the OS's async features?
// almost evrything around networking for all OS's. Some other stuff is OS specific


// 2_ how does this os async  stuff fit into the eventloop?
// tasks using the underlying OS are reflected in our pendingOSTask [] array