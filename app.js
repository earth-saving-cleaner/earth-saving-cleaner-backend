require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const logger = require("morgan");

const webSocket = require("./loaders/socketIo");
require("./loaders/database");

const port = process.env.PORT || "5000";
const app = express();
const server = http.createServer(app);
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

webSocket(server, app);

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require("./routes"));
console.log("TEST");

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err);

  res.locals.message = err.message || result.serverError;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ code: res.status, message: result.serverError });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    code: res.status,
  });
});

server.listen(port);
