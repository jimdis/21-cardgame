'use strict'
const Card = require('./Card')

function createDeck () {
  let deck = []
  let suits = ['♥', '♦', '♣', '♠']
  let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
  for (let i = 0; i < suits.length; i++) {
    for (let y = 0; y < ranks.length; y++) {
      deck.push(new Card(suits[i], ranks[y]))
    }
  }
  return deck
}

// Fisher-Yates shuffling algorithm, adapted from https://www.kirupa.com/html5/shuffling_array_js.htm
function shuffle (arr) {
  var input = arr

  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1))
    var itemAtIndex = input[randomIndex]

    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  return input
}

// funktion för att stoppa in slänghög i deck: this.stock.concat(this.discardPile)

module.exports.createDeck = createDeck
module.exports.shuffle = shuffle
