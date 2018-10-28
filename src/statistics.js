'use strict'

const Game = require('./Game')

function getOptimalThreshold (numberOfRuns, testSubject = 'player') {
  let optimalThresholds = []
  for (let i = 8; i <= 18; i++) {
    let bestThreshold = {
      threshold: 0,
      winRatio: 0
    }
    for (let j = 5; j <= 19; j++) {
      let winRatio
      if (testSubject === 'player') {
        winRatio = testGames(numberOfRuns, j, i).playerWins / numberOfRuns * 100
        // console.log('Dealer threshold: ' + i + ', Player threshold: ' + j + ', Player win ratio: ' + playerWinRatio)
      } else winRatio = testGames(numberOfRuns, i, j).dealerWins / numberOfRuns * 100
      // console.log('Player threshold: ' + i + ', Dealer threshold: ' + j + ', Dealer Win ratio: ' + playerWinRatio)
      if (winRatio >= bestThreshold.winRatio) {
        bestThreshold.winRatio = winRatio
        bestThreshold.threshold = j
      }
    }
    optimalThresholds.push(bestThreshold.threshold)
  }
  // console.log(optimalThresholds)
  return mode(optimalThresholds).pop()
}

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
