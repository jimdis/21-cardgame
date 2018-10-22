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
    console.log(this.play())
  }

  play () {
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i]
      let dealer = this.dealer
      do {
        player.drawCard()
        player.calculateScore()
      } while (player.score < player.threshold && player.hand.length < 5)
      if (player.score > 21) {
        return 'Player is Bust, Dealer Wins!'
      } else if (player.score === 21) {
        return 'Player Wins with 21!'
      } else if (player.hand.length === 5) {
        return 'Player wins with 5 cards < 21'
      } else {
        do {
          dealer.drawCard()
          dealer.calculateScore()
        } while (dealer.score < player.score)
        if (dealer.score > 21) {
          return 'Dealer is Bust, Player Wins!'
        } else if (dealer.score === 21) {
          return 'Dealer Wins with 21!'
        } else return `Dealer Wins with ${dealer.score} vs player's ${player.score}`
      }
    }
  }
}

// console.log(`Player's hand: ${player.renderHand()}, Score: ${player.score}`)
//       console.log(`Dealer's hand: ${dealer.renderHand()}, Score: ${dealer.score}`)

module.exports = Game
