'use strict'

const deck = require('./deck')

class Dealer {
  constructor () {
    this.hand = []
    this.score = 0
  }
  drawCard () {
    let card = deck.pop()
    this.hand.push(card)
    if (typeof card.rank === 'number') {
      this.score += card.rank
    } else if (card.rank === 'J') {
      this.score += 11
    } else if (card.rank === 'Q') {
      this.score += 12
    } else if (card.rank === 'K') {
      this.score += 13
    } else if (card.rank === 'A') {
      if (this.score < 8) {
        this.score += 14
      } else {
        this.score += 1
      }
    }
  }

  renderHand () {
    let arr = []
    for (let i = 0; i < this.hand.length; i++) {
      arr.push((this.hand[i].suit + this.hand[i].rank))
    }
    return arr.join(', ')
  }
}
module.exports = Dealer
