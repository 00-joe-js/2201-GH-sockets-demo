const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, '..', 'public')))

const PORT = 3000

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

// -------

const socketio = require("socket.io");

const socketServer = socketio(server);

socketServer.on("connection", (oneClient) => {

  console.log(`Socket connection established with a client given an ID of ${oneClient.id}`);

  oneClient.on("disconnect", () => {
    oneClient.broadcast.emit("imGone", oneClient.id);
  });

  setInterval(() => {
    const time = (new Date()).toLocaleString();
    oneClient.emit('time-change', time);
  }, 1000);

  oneClient.on("whereMyMouseIs", (obj) => {
    oneClient.broadcast.emit("anotherMouseMove", {
      id: oneClient.id,
      x: obj.x,
      y: obj.y
    });
  });

});