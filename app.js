/**
 * The starting point of the application.
 *
 * @author Jim Disenstam
 * @version 1.0
 */

'use strict'

const Game = require('./src/Game')
const statistics = require('./src/statistics')

const numberOfPlayers = 10
const dealerThreshold = statistics.getOptimalThreshold(1000, 'dealer')
const playerThreshold = statistics.getOptimalThreshold(1000, 'player')

let game = new Game(numberOfPlayers, playerThreshold, dealerThreshold)

console.log(`Starting new game with ${numberOfPlayers} Players with optimized threshold set at ${playerThreshold} and one Dealer with optimized threshold set at ${dealerThreshold}` + '\n')

game.play()

console.log(game.result)
