

class User {
  constructor(userId) {
    this.userId = userId
    this.username = "Unnamed player"
    this.description = "Proud member of the best stradegy game on the internet"
    this.uniform = null

    this.gems = 0
    this.level = 0
    this.xp = 0
    this.maxXp = 0
    this.friends = 0
    this.ownedCosmetics = []
  }
}


module.exports = {User}