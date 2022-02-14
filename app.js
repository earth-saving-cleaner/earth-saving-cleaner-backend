require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const logger = require("morgan");

const { resultMsg } = require("./constants");
const webSocket = require("./loaders/socketIo");
require("./loaders/database");

const port = process.env.PORT || "5000";
const app = express();
const server = http.createServer(app);

const whitelist = [process.env.CLIENT_URL, process.env.CLIENT_URL2];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

webSocket(server, app);

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require("./routes"));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err);

  res.locals.message = err.message || result.serverError;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const code = err.status || 500;
  const message = code === 500 ? resultMsg.serverError : err.message;

  res.status(err.status || 500);
  res.json({ result: resultMsg.fail, message });
});

server.listen(port);
