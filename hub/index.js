"use strict";

const port = process.env.PORT || 3000;

const io = require("socket.io")(port);
console.log(io);

io.on("connection", (socket) => {
  console.log("CONNECTED ", socket.id);

  // socket.on("joinOrderRoom", () => {
  //   socket.join("room1");
  //   console.log("JOINED", socket.id);
  // });

  setInterval(() => {
    socket.emit("packageReady");
  }, 10000);

  socket.on("packageToBeDeleivered", (order) => {
    io.emit("packageToBeDeleivered", order);
  });

  socket.on("packagePickedUp", (order) => {
    io.emit("packagePickedUp", order);
  });

  socket.on("packageDeleivered", (order) => {
    io.emit("packageDeleivered", order);
  });

  socket.on("packageDeleiveredSuccessfully", (order) => {
    io.emit("packageDeleiveredSuccessfully", order);
  });

  // process.exit();
});
