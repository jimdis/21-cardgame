'use strict'

const Card = require('./src/Card')
const deck = require('./src/deck')
const Player = require('./src/Player')
const Dealer = require('./src/Dealer')
const Game = require('./src/Game')

// function game () {
//   player1.drawCard()
//   do {
//     player1.drawCard()
//     player1.calculateScore()
//   } while (player1.score < player1.threshold && player1.hand.length < 5)
//   if (player1.score > 21) {
//     return 'Player is Bust, Dealer Wins!'
//   } else if (player1.score === 21) {
//     return 'Player Wins with 21!'
//   } else if (player1.hand.length === 5) {
//     return 'Player wins with 5 cards < 21'
//   } else {
//     do {
//       dealer.drawCard()
//       dealer.calculateScore()
//     } while (dealer.score < player1.score)
//     if (dealer.score > 21) {
//       return 'Dealer is Bust, Player Wins!'
//     } else if (dealer.score === 21) {
//       return 'Dealer Wins with 21!'
//     } else return `Dealer Wins with ${dealer.score} vs player's ${player1.score}`
//   }
// }

deck.sort(() => Math.random() - 0.5) // test version!!
const numberOfPlayers = 1
let game = new Game()

game.start(numberOfPlayers)

// console.log(deck)
// console.log(player1)
// console.log(dealer)
