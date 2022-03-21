"use strict";

const port = process.env.PORT || 3000;

const io = require("socket.io")(port);

io.on("connection", (socket) => {
  console.log("CONNECTED ", socket.id);

  socket.on("joinOrderRoom", () => {
    socket.join("room1");
    console.log("JOINED", socket.id);
  });

  setInterval(() => {
    socket.to("room1").emit("packageReady");
  }, 10000);
});
