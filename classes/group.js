const {User} = require("./user.js")

class Group {
  constructor() {
    this.players = {}
    this.playerAdded = () => {
      //do something
    }
    this.playerRemoving = () => {
      //do something
    }
  }

  AddPlayer(socket) {
    const plr = new User(socket.id)
    this.players[plr.userId] = plr
    
    this.playerAdded(plr)
  }

  RemovePlayer(socket) {
    this.playerRemoving(this.players[socket.id])
    delete this.players[socket.id]
  }

  Player(socket) {
    return this.players[socket.id]
  }

}


module.exports = {Group}