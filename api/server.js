const express = require("express");
const helmet = require("helmet");

const projectsRouter = require("../routers/projectsRouter");
const actionsRouter = require("../routers/actionsRouter");

const server = express();

function logger(req, res, next) {
  console.log(
    `${req.method} to ${req.originalUrl} at ${new Date().toISOString()}`
  );
  next();
}

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`Welcome from server.js`);
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong 🙁"
  });
});

module.exports = server;
