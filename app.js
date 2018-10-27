'use strict'

// const Card = require('./src/Card')
// const deck = require('./src/deck')
// const Player = require('./src/Player')
const Game = require('./src/Game')
const statistics = require('./src/statistics')

const numberOfPlayers = 10
const dealerThreshold = statistics.getOptimalThreshold('dealer')
const playerThreshold = statistics.getOptimalThreshold('player')
let game = new Game(numberOfPlayers, playerThreshold, dealerThreshold)
console.log(`Starting new game with ${numberOfPlayers} Players with optimized threshold set at ${playerThreshold} and one Dealer with optimized threshold set at ${dealerThreshold}`)
game.play()
console.log(game.result)

// console.log('Stock:')
// console.log(this.decks.stock)
// console.log('Discard Pile:')
// console.log(this.decks.discardPile)
