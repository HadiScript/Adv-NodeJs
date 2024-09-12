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

// Starting from index2.js and removing all the stuff

// start like this

// pm2 start index3.js -i 0
// -i 0 ->  mean let pm2 decide how many cluster should you app have
// and create number instanaces equal to number of logical cores in our computer,

// it created, 8 instances 
