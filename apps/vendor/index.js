const { faker } = require("@faker-js/faker");
("use strict");

const io = require("socket.io-client");

const host = "http://localhost:3000";

const hubConnection = io.connect(host);

hubConnection.on(
  "packageDeleiveredSuccessfully",
  packageDeleiveredSuccessfully
);

hubConnection.on("packageReady", packageReady);

function packageReady(socket) {
  //   console.log("We have a package to be delivered");
  const order = {
    id: faker.datatype.uuid(),
    time: new Date().toISOString(),
    store: "Delivery Heroes",
    customer: `${faker.name.firstName()}`,
    address: `${faker.address.city()}`,
  };
  console.log(`EVENT: "pickup"
  time:${order.time},
  order details: {
    id: ${order.id},
    time: ${order.time},
    store: ${order.store},
    customer: ${order.customer},
    address: ${order.customer}
  }
  `);
  socket.emit("packageToBeDeleivered", order);
}

function packageDeleiveredSuccessfully(order) {
  console.log(`VENDOR: Thank you for delivering ${order.id}`);
  console.log(`EVENT: "delivered"
    time:${new Date().toISOString()},
    order details: {
      id: ${order.id},
      time: ${order.time},
      store: ${order.store},
      customer: ${order.customer},
      address: ${order.customer}
    }
    `);
}
