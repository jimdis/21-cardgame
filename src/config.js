/**
 * Module for configuration.
 *
 * @module src/config
 * @author Jim Disenstam
 * @version 1.0
 */

'use strict'

const statistics = require('./statistics')

const parameters = {
  // Set number of players. A number between 1 and 42:
  numberOfPlayers: 10,
  // Threshold where Players wil stop drawing new cards (number between 1 and 21, or 'auto'):
  playersThreshold: 'auto',
  // Threshold where Dealer wil stop drawing new cards (number between 1 and 21, or 'auto'):
  dealerThreshold: 'auto'
}

function getThreshold (who) {
  if (who !== 'players' || who !== 'dealer') {
    throw Error('The passed argument in getThreshold() must be either \'players\' or \'dealer\'')
  }
  if (who === 'players') {
    if (typeof parameters.playersThreshold === 'string' && parameters.playersThreshold.toLowerCase() === 'auto') {
      return statistics.getOptimalThreshold(1000, 'player')
    } else return parameters.playersThreshold
  }
  if (who === 'dealer') {
    if (typeof parameters.dealerThreshold === 'string' && parameters.dealerThreshold.toLowerCase() === 'auto') {
      return statistics.getOptimalThreshold(1000, 'dealer')
    } else return parameters.dealerThreshold
  }
}

module.exports.parameters = parameters
module.exports.getThreshold = getThreshold
