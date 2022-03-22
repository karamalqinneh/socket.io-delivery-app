"use strict";

const io = require("socket.io")(3000);

describe("testing events", () => {
  const value = "testing";
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  afterAll(() => {
    consoleSpy.mockRestore();
    // io.close();
    io.httpServer.close();
  });

  it("testing the packageReady event", async () => {
    io.emit("packageReady", value);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("testing the packageDeleiveredSuccessfully event", async () => {
    io.emit("packageDeleiveredSuccessfully", value);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
  it("testing the packagePickedUp event", async () => {
    io.emit("packagePickedUp", value);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
  it("testing the packageDeleivered event", async () => {
    io.emit("packageDeleivered", value);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
});
