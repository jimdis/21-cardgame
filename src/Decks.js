'use strict'
const Card = require('./Card')

function Decks () {
  this.stock = []
  this.discardPile = []
}

Decks.prototype.newDeck = function () {
  this.stock = []
  let suits = ['♥', '♦', '♣', '♠']
  let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
  for (let i = 0; i < suits.length; i++) {
    for (let y = 0; y < ranks.length; y++) {
      this.stock.push(new Card(suits[i], ranks[y]))
    }
  }
  return this.stock
}

// Fisher-Yates shuffling algorithm, adapted from https://www.kirupa.com/html5/shuffling_array_js.htm
Decks.prototype.shuffle = function () {
  var input = this.stock.concat(this.discardPile)

  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1))
    var itemAtIndex = input[randomIndex]

    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  this.stock = input
  this.discardPile = []
}

module.exports = Decks
