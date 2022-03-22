"use strict";

const io = require("socket.io-client");

const host = "http://localhost:3000";

const hubConnection = io.connect(host);
// let apps = io.connect(host + "/apps");

hubConnection.emit("joinOrderRoom");
hubConnection.on("packagePickedUp", packagePickedUp);
hubConnection.on("packageDeleivered", packageDeleivered);
hubConnection.on("packageToBeDeleivered", packageToBeDeleivered);

function packageToBeDeleivered(order) {
  console.log(
    `You have a package for Mr.${order.customer} to deliver at ${order.address}`
  );
  setTimeout(() => {
    hubConnection.emit("packagePickedUp", order);
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
    hubConnection.emit("packageDeleivered", order);
  }, 3000);
}
function packageDeleivered(order) {
  console.log(`DRIVER: delivered order ${order.id}`);
  setTimeout(() => {
    hubConnection.emit("packageDeleiveredSuccessfully", order);
  }, 100);
}
