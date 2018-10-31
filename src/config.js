/**
 * Module for configuration.
 *
 * @module src/config
 * @author Jim Disenstam
 * @version 1.1
 */

'use strict'

const statistics = require('./statistics')

const settings = {
  // Set number of players. A number between 1 and 42:
  numberOfPlayers: 10,
  // Threshold where Players will stop drawing new cards. Insert number between 1 and 21, or 'auto'):
  playersThreshold: 'auto',
  // Threshold where Dealer will stop drawing new cards. Insert number between 1 and 21, or 'auto'):
  dealerThreshold: 'auto'
}

/**
 * Returns threshold for either players or dealer based on 'settings' object with which the function is called.
 * If set to a value between 1-21, returned threshold will be that value.
 * If set to 'auto' (or anything but a relevant value), returned threshold will be automatically optimized.
 *
 * @throws {Error} The passed argument in getThreshold must be either 'player' or 'dealer'.
 * @param {string} who - Either 'player' or 'dealer'.
 * @returns {number} - The threshold.
 */
function getThreshold (who) {
  if (who !== 'player' && who !== 'dealer') {
    throw Error('The passed argument in getThreshold() must be either \'player\' or \'dealer\'')
  }
  if (who === 'player' && typeof this.playersThreshold === 'number') {
    return this.playersThreshold
  }
  if (who === 'dealer' && typeof this.dealerThreshold === 'number') {
    return this.dealerThreshold
  } else return statistics.getOptimalThreshold(1000, who)
}

module.exports.settings = settings
module.exports.getThreshold = getThreshold
