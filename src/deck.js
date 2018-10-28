/**
 * Module for deck.
 *
 * @module src/deck
 * @author Jim Disenstam
 * @version 1.0
 */

'use strict'

const Card = require('./Card')

/**
 * Returns an array with Card objects representing a deck of 52 playing cards.
 *
 * @returns {array} - An array with Card objects representing a deck of 52 playing cards.
 */
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

/**
 * Takes an array as an argument and returns a shuffled copy of that array.
 * Fisher-Yates shuffling algorithm, adapted from https://www.kirupa.com/html5/shuffling_array_js.htm
 *
 * @param {array} arr - The array that needs shuffling.
 * @returns {array} - A shuffled copy of the array passed as an argument.
 */
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

module.exports.createDeck = createDeck
module.exports.shuffle = shuffle
