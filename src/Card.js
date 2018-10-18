'use strict'
function Card(suit, rank) {
  this.suit = suit
  this.rank = rank
}

Card.prototype.convert = function (sum) {
  if (this.rank === 'J') {
    this.rank = 11
  } else if (this.rank === 'Q') {
    this.rank = 12
  } else if (this.rank === 'K') {
    this.rank = 13
  } else if (this.rank === 'A') {
    if (sum < 8) {
      this.rank = 14
    } else {
      this.rank = 1
    }
  }
}

module.exports = Card
