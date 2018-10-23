'use strict'

const Card = require('./src/Card')
const Decks = require('./src/Decks')
const Player = require('./src/Player').default
const Dealer = require('./src/Dealer')
const Game = require('./src/Game')

const numberOfPlayers = 15
let game = new Game()
console.log(game.start(numberOfPlayers))
