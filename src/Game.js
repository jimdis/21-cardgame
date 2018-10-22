'use strict'

const deck = require('./deck')
const Player = require('./Player')
const Dealer = require('./Dealer')

class Game {
  constructor () {
    this.players = []
    this.dealer = new Dealer()
  }

  start (numberOfPlayers) {
    for (let i = 0; i < numberOfPlayers; i++) {
      this.players.push(new Player(i + 1))
    }
    this.play()
  }

  play () {
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i]
      let dealer = this.dealer
      dealer.hand = []
      dealer.score = 0
      do {
        player.drawCard()
        player.calculateScore()
      } while (player.score < player.threshold && player.hand.length < 5)
      if (player.score < 21 && player.hand.length < 5) {
        do {
          dealer.drawCard()
          dealer.calculateScore()
        } while (dealer.score < dealer.threshold)
      }
      console.log(this.result(player, dealer) + '\n')
    }
  }

  result (player, dealer) {
    let result = `Player #${player.playerNum}: ${player.renderHand()}. Score: ${player.score}.`
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
// console.log(`Player: ${player.renderHand()}, Score: ${player.score}`)
//       console.log(`Dealer: ${dealer.renderHand()}, Score: ${dealer.score}`)

module.exports = Game
