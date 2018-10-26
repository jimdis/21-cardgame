'use strict'

const Card = require('./src/Card')
const deck = require('./src/deck')
const Player = require('./src/Player').default
const Game = require('./src/Game')
const statistics = require('./src/statistics')

console.log(statistics.gatherData(100, 5, 20))

// const numberOfPlayers = 10
// let game = new Game(numberOfPlayers)
// game.play()
// console.log(game.result)

// console.log('Stock:')
// console.log(this.decks.stock)
// console.log('Discard Pile:')
// console.log(this.decks.discardPile)
