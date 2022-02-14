const { Server } = require("socket.io");

module.exports = (server, app) => {
  const io = new Server(server);
  app.set("io", io);
  const map = io.of("/map");

  const locations = {};

  map.on("connection", (socket) => {
    socket.on("join", (initData) => {
      initData.sid = socket.id;
      locations[socket.id] = initData;
      socket.emit("locations", locations);
    });

    socket.on("gps", (gps) => {
      if (locations[socket.id] && gps?.longitude) {
        locations[socket.id].location = gps;
      }
      socket.emit("locations", locations);
    });

    socket.on("disconnect", () => {
      delete locations[socket.id];
      socket.emit("locations", locations);
    });
  });
};
