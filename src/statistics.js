/**
 * Module for statistics.
 *
 * @module src/statistics
 * @author Jim Disenstam
 * @version 1.0
 */

'use strict'

const Game = require('./Game')

/**
 * Returns a number representing the optimal threshold setting to use against opponent.
 *
 * @param {number} numberOfRuns - Number of times a game is played to test each threshold setting.
 * @param {string} [testSubject='player'] - The test subject, either 'player' or 'dealer'.
 * @returns {number} - The optimal threshold setting.
 */
function getOptimalThreshold (numberOfRuns, testSubject = 'player') {
  if (numberOfRuns < 1 || typeof numberOfRuns !== 'number') {
    throw Error('The passed argument numberOfRuns must be a number > 0')
  }
  if (testSubject !== 'player' && testSubject !== 'dealer') {
    throw Error('The passed argument testSubject must be either \'player\' or \'dealer\'')
  }
  let optimalThresholds = []
  // Outer loop: Test optimal threshold for each of opponent's thresholds between 8-18.
  for (let i = 8; i <= 18; i++) {
    let bestThreshold = {
      threshold: 0,
      winRatio: 0
    }
    // Inner loop: Test own optimal threshold between 5-19.
    for (let j = 5; j <= 19; j++) {
      let winRatio
      if (testSubject === 'player') {
        winRatio = testGames(numberOfRuns, j, i).playerWins / numberOfRuns * 100
      } else winRatio = testGames(numberOfRuns, i, j).dealerWins / numberOfRuns * 100
      if (winRatio >= bestThreshold.winRatio) {
        bestThreshold.winRatio = winRatio
        bestThreshold.threshold = j
      }
    }
    optimalThresholds.push(bestThreshold.threshold)
  }
  // Find the optimal thresholds and pick the highest one:
  return mode(optimalThresholds).pop()
}

/**
 * Returns an Object containing the win ratios of the player and dealer from a number of tested games.
 *
 * @param {number} numberOfGames - Number of games tested.
 * @param {number} playerThreshold - Player's threshold tested.
 * @param {number} dealerThreshold - Dealer's threshold tested.
 * @returns {object} - An Object containing the win ratios of the player and dealer from a number of tested games.
 */
function testGames (numberOfGames, playerThreshold, dealerThreshold) {
  let winner = []
  for (let i = 0; i < numberOfGames; i++) {
    let game = new Game(1)
    game.players[0].threshold = playerThreshold
    game.dealer.threshold = dealerThreshold
    game.play()
    if (game.result.includes('Player Wins')) {
      winner.push('P')
    } else winner.push('D')
  }
  let playerWins = winner.filter(winner => winner === 'P')
  let dealerWins = winner.filter(winner => winner === 'D')
  let statistics = {
    playerWins: playerWins.length,
    dealerWins: dealerWins.length
  }
  return statistics
}

/**
 * Returns the mode from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @returns {number[]} The mode in the set of data.
 */
function mode (numbers) {
  let sortedNumbers = numbers.slice().sort((a, b) => a - b)
  let previousNumber = ''
  let counter = 1
  let counterMax = 1
  let mode = sortedNumbers // If passed argument contains only one number.
  for (let i = 0; i < sortedNumbers.length; i++) {
    if (sortedNumbers[i] === previousNumber) {
      counter++
      if (counter > counterMax) {
        mode = [sortedNumbers[i]]
        counterMax = counter
      } else if (counter === counterMax) {
        mode.push(sortedNumbers[i])
      }
    } else {
      previousNumber = sortedNumbers[i]
      counter = 1
    }
  }
  return mode
}

module.exports.getOptimalThreshold = getOptimalThreshold
