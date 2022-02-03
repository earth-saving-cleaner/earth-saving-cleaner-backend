const { Server } = require("socket.io");

module.exports = (server, app) => {
  const io = new Server(server);
  app.set("io", io);
  const test = io.of("/test");

  test.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("test", "test!!!!!");

    socket.on("disconnect", (test) => {
      console.log(test);
      console.log("user disconnected");
    });
  });
};
