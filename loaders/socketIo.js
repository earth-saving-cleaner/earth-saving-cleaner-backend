const { Server } = require("socket.io");

module.exports = (server, app) => {
  const io = new Server(server);
  app.set("io", io);

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
