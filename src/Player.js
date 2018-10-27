'use strict'

class Player {
  constructor (name, threshold = 15) {
    this.name = name
    this.threshold = threshold
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
