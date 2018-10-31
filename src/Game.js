/**
 * Module for Game.
 *
 * @module src/Game
 * @author Jim Disenstam
 * @version 1.0
 */

'use strict'

const deck = require('./deck')
const Player = require('./Player')
const scoring = require('./scoring')

/**
 * Represents a game of '21'.
 *
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   * @param {number} [numberOfPlayers=1] - The number of players in the Game. Accepts Mininum 1, Maximum 42.
   * @param {number} [playersThreshold=15] - The threshold score where the players will stop and not draw any more cards. Accepts Minimum 1, Maximum 21.
   * @param {number} [dealerThreshold=15] - The threshold score where the dealer will stop and not draw any more cards. Accepts Minimum 1, Maximum 21.
   * @throws {Error} The passed argument numberOfPlayers must be a number between 1 and 42.
   * @throws {Error} The passed argument playersThreshold must be a number between 1 and 21.
   * @throws {Error} The passed argument dealerThreshold must be a number between 1 and 21.
   * @memberof Game
   */
  constructor (numberOfPlayers, playersThreshold, dealerThreshold) {
    if (numberOfPlayers < 1 || numberOfPlayers > 42 || typeof numberOfPlayers !== 'number') {
      throw Error('The passed argument numberOfPlayers must be a number between 1 and 42.')
    }
    if (playersThreshold < 1 || playersThreshold > 21 || typeof playersThreshold !== 'number') {
      throw Error('The passed argument playersThreshold must be a number between 1 and 21.')
    }
    if (dealerThreshold < 1 || dealerThreshold > 21 || typeof dealerThreshold !== 'number') {
      throw Error('The passed argument dealerThreshold must be a number between 1 and 21.')
    }

    /**
    * An array with each element containing a Player object
    *
    * @type {Array}
    */
    this.players = this.populateGame(numberOfPlayers, playersThreshold)

    /**
    * A Player object named 'Dealer', representing the Dealer in the Game.
    *
    * @type {object}
    */
    this.dealer = new Player('Dealer', dealerThreshold)

    /**
    * An array with each element containing a Card object, representing a deck of playing cards.
    *
    * @type {Array}
    */
    this.deck = deck.createDeck()

    /**
    * An array with each element containing a Card object, representing the discard pile where already played cards are discarded.
    *
    * @type {Array}
    */
    this.discardPile = []

    /**
    * A string that logs the hands and scores of each individual player vs dealer match.
    *
    * @type {string}
    */
    this.result = ''
  }

  /**
   * Returns an array with Player objects named 'Player#1', 'Player#2', ..., 'Player#n' where n = numberOfPlayers.
   *
   * @param {number} numberOfPlayers - The number of new Player objects in the returned array.
   * @param {number} playersThreshold - The threshold score of the players.
   * @returns {Array} - An array with Player objects.
   * @memberof Game
   */
  populateGame (numberOfPlayers, playersThreshold) {
    let players = []
    for (let i = 0; i < numberOfPlayers; i++) {
      players.push(new Player(`Player #${i + 1}`, playersThreshold))
    }
    return players
  }

  /**
   * Triggers the Game to start playing according to the set rules and updates the relevant properties in the Game object accordingly.
   *
   * @memberof Game
   */
  play () {
    deck.shuffle(this.deck)
    // First card dealt to all players:
    this.players.forEach(player => this.drawCard(player))
    // Each player takes turns playing against dealer:
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i]
      let dealer = this.dealer
      do {
        this.drawCard(player)
        player.score = scoring.calculateScore(player.hand)
      } while (player.score < player.threshold && player.hand.length < 5)
      if (player.score < 21 && player.hand.length < 5) {
        do {
          this.drawCard(dealer)
          dealer.score = scoring.calculateScore(dealer.hand)
        } while (dealer.score < dealer.threshold)
      }
      // Add the result of each individual play to result property:
      this.result += scoring.toString(player, dealer)

      // Move player's and dealer's hands to discard pile and reset dealer score:
      this.discardPile = this.discardPile
        .concat(player.hand.splice(0), dealer.hand.splice(0))
      dealer.score = 0
    }
  }

  /**
   * Pops a card out of the deck array and pushes it to the relevant player's hand array.
   * If deck array only contains one Card object, the discardPile array is concatenated into the deck array and then shuffled.
   *
   * @param {object} player - The relevant player (or Dealer) drawing the card.
   * @memberof Game
   */
  drawCard (player) {
    if (this.deck.length === 1) {
      this.deck = this.deck.concat(this.discardPile)
      this.discardPile = []
      deck.shuffle(this.deck)
    }
    let card = this.deck.pop()
    player.hand.push(card)
  }
}

module.exports = Game
