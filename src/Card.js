/**
 * Module for Card.
 *
 * @module src/Card
 * @author Jim Disenstam
 * @version 1.0
 */

'use strict'

/**
 * Creates a JavaScript Card instance that represents a playing card.
 *
 * @param {string} suit - The suit of the card.
 * @param {number, string} rank - The rank of the card.
 */
function Card (suit, rank) {
  /**
  * A string representing the suit of the card.
  *
  * @type {string} - The suit of the card.
  */
  this.suit = suit

  /**
  * A number or string representing the rank of the card.
  *
  * @type {number, string} - The rank of the card.
  */
  this.rank = rank

  Object.freeze(this)
}

module.exports = Card
