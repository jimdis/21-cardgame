'use strict'

const deck = require('./deck')

class Player {
  constructor (playerNum) {
    this.playerNum = playerNum
    this.threshold = 15
    this.hand = []
    this.score = 0
  }

  drawCard () {
    let card = deck.pop()
    this.hand.push(card)
  }

  calculateScore () {
    let arr = []
    for (let i = 0; i < this.hand.length; i++) {
      let rank = this.hand[i].rank
      if (typeof rank === 'number') {
        arr.push(rank)
      } else if (rank === 'J') {
        arr.push(11)
      } else if (rank === 'Q') {
        arr.push(12)
      } else if (rank === 'K') {
        arr.push(13)
      }
    }
    let score = arr.reduce((a, b) => a + b)
    let aces = this.hand.filter(obj => obj.rank === 'A')
    if (aces.length === 0) {
      this.score = score
    } else if (aces.length === 1) {
      if (score < 8) {
        score += 14
      } else score += 1
    } else if (aces.length === 2) {
      if (score < 7) {
        score += 15
      } else {
        score += 2
      }
    } else if (aces.length === 3) {
      if (score < 6) {
        score += 16
      } else {
        score += 3
      }
    } else if (aces.length === 4) {
      if (score < 5) {
        score += 17
      } else {
        score += 4
      }
    }
    this.score = score
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
