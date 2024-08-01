const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const {User} = require(__dirname+"/classes/user.js")
const {Group} = require(__dirname+"/classes/group.js")

app.use(express.static(__dirname+"/public"))

const players = new Group()

io.on('connection', (socket) => {

  players.AddPlayer(socket)
  socket.on('disconnect', () => {
   players.RemovePlayer(socket)
  })

  socket.on("saveProfile", (profile) => {
    let player = players.Player(socket)

    player.username = profile.username
    player.description = player.description

    socket.emit("saveProfileResponse")
    console.log(player)
  })
  
});

players.playerAdded = (plr) => {
  console.log("welcome", plr.username)
}
players.playerRemoving = (plr) => {
  console.log("bye bye", plr.username)
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});