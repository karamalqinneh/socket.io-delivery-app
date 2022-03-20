"use strict";

"use strict";

const port = process.env.PORT || 3000;

const io = require("socket.io")(port);

require("./apps/driver");
require("./apps/vendor");

setInterval(() => {
  eventEmitter.emit("packageReady");
}, 10000);

io.on("connection", (socket) => {
  console.log("CONNECTED ", socket.id);

  setInterval(() => {
    io.emit("packageReady");
  }, 10000);

  //   socket.on("light", (payload) => {
  //     io.emit("brightness", { brightness: payload.level }); // this will emit the 'brightness' event to all connected clients
  //   });
});
