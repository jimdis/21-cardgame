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
module.exports = createDeck()
