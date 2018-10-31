/**
 * The starting point of the application.
 * Please set the configuration for number of players and thresholds in config.js!
 *
 * @author Jim Disenstam
 * @version 1.0
 */

'use strict'

const config = require('./src/config')
const Game = require('./src/Game')

try {
  const numberOfPlayers = config.parameters.numberOfPlayers
  const playersThreshold = config.getThreshold('players')
  const dealerThreshold = config.getThreshold('dealer')
  let game = new Game(numberOfPlayers, playersThreshold, dealerThreshold)
  console.log(`Starting new game with ${numberOfPlayers} Players and one Dealer with ${(typeof config.parameters.playersThreshold === 'string') ? 'optimized' : 'manual'} threshold set at ${playersThreshold} for Players and ${(typeof config.parameters.dealerThreshold === 'string') ? 'optimized' : 'manual'} threshold set at ${dealerThreshold} for Dealer` + '\n')
  game.play()
  console.log(game.result)
} catch (e) {
  console.error('ERROR: ', e.message)
}
