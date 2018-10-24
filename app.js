'use strict'

const Card = require('./src/Card')
const deck = require('./src/deck')
const Player = require('./src/Player').default
const Dealer = require('./src/Dealer')
const Game = require('./src/Game')

const numberOfPlayers = 25
let game = new Game(numberOfPlayers)
console.log(game.play())

// console.log('Stock:')
// console.log(this.decks.stock)
// console.log('Discard Pile:')
// console.log(this.decks.discardPile)
