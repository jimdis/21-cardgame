'use strict'

const Card = require('./src/Card')
const Decks = require('./src/Decks')
const Player = require('./src/Player').default
const Dealer = require('./src/Dealer')
const Game = require('./src/Game')

const numberOfPlayers = 5
let game = new Game()
console.log(game.start(numberOfPlayers))

// console.log('Stock:')
// console.log(this.decks.stock)
// console.log('Discard Pile:')
// console.log(this.decks.discardPile)
