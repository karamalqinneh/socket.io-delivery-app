"use strict";

const io = require("socket.io-client");

const host = "http://localhost:3000";

const hubConnection = io.connect(host);

eventEmitter.on("packagePickedUp", packagePickedUp);
eventEmitter.on("packageDeleivered", packageDeleivered);
eventEmitter.on("packageToBeDeleivered", packageToBeDeleivered);

function packageToBeDeleivered(order) {
  console.log(
    `You have a package for Mr.${order.customer} to delver at ${order.address}`
  );
  setTimeout(() => {
    eventEmitter.emit("packagePickedUp", order);
  }, 3000);
}
function packagePickedUp(order) {
  console.log(`DRIVER: picked up order ${order.id}`);
  console.log(`EVENT: "in-transit"
  time:${new Date().toISOString()},
  order details: {
    id: ${order.id},
    time: ${order.time},
    store: ${order.store},
    customer: ${order.customer},
    address: ${order.customer}
  }
  `);
  setTimeout(() => {
    eventEmitter.emit("packageDeleivered", order);
  }, 3000);
}
function packageDeleivered(order) {
  console.log(`DRIVER: delivered order ${order.id}`);
  setTimeout(() => {
    eventEmitter.emit("packageDeleiveredSuccessfully", order);
  }, 100);
}
