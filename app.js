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

const settings = config.settings
try {
  const numberOfPlayers = settings.numberOfPlayers
  const playersThreshold = config.getThreshold.call(settings, 'player')
  const dealerThreshold = config.getThreshold.call(settings, 'dealer')
  let game = new Game(numberOfPlayers, playersThreshold, dealerThreshold)
  console.log(`Starting new game with ${numberOfPlayers} Players with ${(typeof settings.playersThreshold === 'string') ? 'optimized' : 'manual'} threshold set at ${playersThreshold}, and one Dealer with ${(typeof settings.dealerThreshold === 'string') ? 'optimized' : 'manual'} threshold set at ${dealerThreshold}` + '\n')
  game.play()
  console.log(game.result)
} catch (e) {
  console.error('ERROR: ', e.message)
}
