const mongoose = require("mongoose");

let connectCount = 0;

const connect = () => {
  mongoose.connect(
    process.env.DB_ATLAS,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error("fail to connect mongodb", err);
      } else {
        console.log("success mongodb connection");
      }
    },
  );
};

const db = mongoose.connection;

db.on("disconnected", () => {
  connectCount += 1;

  if (connectCount < 5) {
    connect();
  }
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});

connect();
