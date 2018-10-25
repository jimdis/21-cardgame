'use strict'

const deck = require('./deck')
const Player = require('./Player')
const scoring = require('./scoring')

class Game {
  constructor (numberOfPlayers) {
    this.players = this.populateGame(numberOfPlayers)
    this.dealer = new Player('Dealer')
    this.deck = deck.createDeck()
    this.discardPile = []
    this.result = ''
  }

  populateGame (numberOfPlayers) {
    let players = []
    for (let i = 0; i < numberOfPlayers; i++) {
      players.push(new Player(`Player #${i + 1}`))
    }
    return players
  }

  play () {
    deck.shuffle(this.deck)
    // First card dealt to all players:
    for (let i = 0; i < this.players.length; i++) {
      this.drawCard(this.players[i])
    }
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
      this.discardPile = this.discardPile.concat(player.hand.splice(0), dealer.hand.splice(0))
      dealer.score = 0
    }
  }

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
