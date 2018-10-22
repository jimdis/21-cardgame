'use strict'

const Card = require('./src/Card')
const deck = require('./src/deck')
const Player = require('./src/Player')
const Dealer = require('./src/Dealer')
const Game = require('./src/Game')

deck.sort(() => Math.random() - 0.5) // test version!!
const numberOfPlayers = 3
let game = new Game()

game.start(numberOfPlayers)

// console.log(deck)
// console.log(player1)
// console.log(dealer)
