const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

// const helmet = require("helmet");
// const morgan = require("morgan");

const server = express();




//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ---> method: ${req.method} ---> url: ${req.url}`
  );

  next();
}

server.use(express.json())
server.use(logger)
server.use("/api/post", postRouter)
server.use("/api/user", userRouter)
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
module.exports = server;
