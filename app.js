/**
 * The starting point of the application.
 *
 * @author Jim Disenstam
 * @version 1.1
 */

'use strict'

const config = require('./src/config')
const Game = require('./src/Game')

const settings = config.settings

// Set number of players. A number between 1 and 42:
settings.numberOfPlayers = 42

// Set Threshold where Players will stop drawing new cards. Insert number between 1 and 21, or 'auto':
settings.playersThreshold = 'auto'

// Set Threshold where Dealer will stop drawing new cards. Insert number between 1 and 21, or 'auto':
settings.dealerThreshold = 'auto'

try {
  let numberOfPlayers = settings.numberOfPlayers
  let playersThreshold = settings.getThreshold('player')
  let dealerThreshold = settings.getThreshold('dealer')
  let game = new Game(numberOfPlayers, playersThreshold, dealerThreshold)
  console.log(`Starting new game with ${(numberOfPlayers === 1) ? 'one Player' : numberOfPlayers + ' Players'} with ${(typeof settings.playersThreshold === 'string') ? 'optimized' : 'manual'} threshold set at ${playersThreshold + '\n'}vs one Dealer with ${(typeof settings.dealerThreshold === 'string') ? 'optimized' : 'manual'} threshold set at ${dealerThreshold}:` + '\n')
  game.play()
  console.log(game.result)
} catch (e) {
  console.error('ERROR: ', e.message)
}
