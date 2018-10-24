'use strict'

const deck = require('./deck')
const Player = require('./Player')

class Game {
  constructor (numberOfPlayers) {
    this.players = this.populateGame(numberOfPlayers)
    this.dealer = new Player('Dealer')
    this.deck = deck.createDeck()
    this.discardPile = []
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
        player.calculateScore()
      } while (player.score < player.threshold && player.hand.length < 5)
      if (player.score < 21 && player.hand.length < 5) {
        do {
          this.drawCard(dealer)
          dealer.calculateScore()
        } while (dealer.score < dealer.threshold)
      }
      // Log the result of each individual game:
      console.log(this.result(player, dealer) + '\n')

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

  result (player, dealer) {
    let result = `${player.name}: ${player.renderHand()}. Score: ${player.score}.`
    if (dealer.score > 0) {
      result += `
Dealer: ${dealer.renderHand()}. Score: ${dealer.score}.`
    }
    if (player.score > 21) {
      result += `
Player is Bust, Dealer Wins!`
    } else if (player.score === 21) {
      result += `
Player Wins with 21!`
    } else if (player.hand.length === 5) {
      result += `
Player wins with 5 cards < 21!`
    } else if (player.score > dealer.score) {
      result += `
Player wins with ${player.score} vs dealer's ${dealer.score}.`
    } else if (dealer.score > 21) {
      result += `
Dealer is Bust, Player Wins!`
    } else if (dealer.score === 21) {
      result += `
Dealer Wins with 21!`
    } else if (dealer.score >= player.score) {
      result += `
Dealer Wins with ${dealer.score} vs player's ${player.score}`
    }
    return result
  }
}

module.exports = Game
