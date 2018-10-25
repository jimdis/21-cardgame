'use strict'

class Player {
  constructor (name) {
    this.name = name
    this.threshold = 15
    this.hand = []
    this.score = 0
  }

  renderHand () {
    let arr = []
    for (let i = 0; i < this.hand.length; i++) {
      arr.push((this.hand[i].suit + this.hand[i].rank))
    }
    return arr.join(', ')
  }
}
module.exports = Player
