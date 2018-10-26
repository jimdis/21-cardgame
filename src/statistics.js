'use strict'

const Game = require('./Game')

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

function gatherData (numberOfGames, startThreshold, endThreshold) {
  let defensiveThreshold = 8
  let offensiveThreshold = 15
  let logResults = `Games tested: ${numberOfGames}`
  let statistics = {
    playerVsDefDealer: {},
    playerVsOffDealer: {},
    dealerVsDefPlayer: {},
    dealerVsOffPlayer: {}
  }
  // Test Optimal Player Threshold if Dealers is deemed Defensive
  logResults += '\n\nPlayer vs Defensive Dealer:\n'
  let winPercent = 0
  let threshold = 0
  for (let i = startThreshold; i < endThreshold; i++) {
    let result = testGames(numberOfGames, i, defensiveThreshold)
    let newWinPercent = Math.round(result.playerWins / numberOfGames * 100)
    if (newWinPercent > winPercent) {
      winPercent = newWinPercent
      threshold = i
    }
    statistics.playerVsDefDealer.threshold = threshold
    statistics.playerVsDefDealer.winPercent = winPercent
    logResults += `Player Threshold: ${i}, Win ratio: ${Math.round(result.playerWins / numberOfGames * 100)}%` + '\n'
    // dealerWins += `Dealer Threshold: ${defensiveThreshold}, Win ratio: ${result.dealerWins / numberOfGames * 100}%` + '\n'
  }
  // Test Optimal Player Threshold if Dealers is deemed Offensive
  winPercent = 0
  threshold = 0
  logResults += '\n\nPlayer vs Offensive Dealer:\n'
  for (let i = startThreshold; i < endThreshold; i++) {
    let result = testGames(numberOfGames, i, offensiveThreshold)
    let newWinPercent = Math.round(result.playerWins / numberOfGames * 100)
    if (newWinPercent > winPercent) {
      winPercent = newWinPercent
      threshold = i
    }
    statistics.playerVsOffDealer.threshold = threshold
    statistics.playerVsOffDealer.winPercent = winPercent
    logResults += `Player Threshold: ${i}, Win ratio: ${Math.round(result.playerWins / numberOfGames * 100)}%` + '\n'
    // dealerWins += `Dealer Threshold: ${offensiveThreshold}, Win ratio: ${result.dealerWins / numberOfGames * 100}%` + '\n'
  }
  // Test Optimal Dealer Threshold if Player is deemed Defensive
  logResults += '\n\nDealer vs Defensive Player:\n'
  winPercent = 0
  threshold = 0
  for (let i = startThreshold; i < endThreshold; i++) {
    let result = testGames(numberOfGames, defensiveThreshold, i)
    let newWinPercent = Math.round(result.dealerWins / numberOfGames * 100)
    if (newWinPercent > winPercent) {
      winPercent = newWinPercent
      threshold = i
    }
    statistics.dealerVsDefPlayer.threshold = threshold
    statistics.dealerVsDefPlayer.winPercent = winPercent
    // playerWins += `Player Threshold: ${defensiveThreshold}, Win ratio: ${result.playerWins / numberOfGames * 100}%` + '\n'
    logResults += `Dealer Threshold: ${i}, Win ratio: ${Math.round(result.dealerWins / numberOfGames * 100)}%` + '\n'
  }
  // Test Optimal Dealer Threshold if Player is deemed Offensive
  logResults += '\n\nDealer vs Offensive Player:\n'
  winPercent = 0
  threshold = 0
  for (let i = startThreshold; i < endThreshold; i++) {
    let result = testGames(numberOfGames, offensiveThreshold, i)
    let newWinPercent = Math.round(result.dealerWins / numberOfGames * 100)
    if (newWinPercent > winPercent) {
      winPercent = newWinPercent
      threshold = i
    }
    statistics.dealerVsOffPlayer.threshold = threshold
    statistics.dealerVsOffPlayer.winPercent = winPercent
    // playerWins += `Player Threshold: ${offensiveThreshold}, Win ratio: ${result.playerWins / numberOfGames * 100}%` + '\n'
    logResults += `Dealer Threshold: ${i}, Win ratio: ${Math.round(result.dealerWins / numberOfGames * 100)}%` + '\n'
  }
  console.log(logResults)

  let descriptiveStatistics = `Tested ${numberOfGames} games.` + ' \n\n' +
    `Optimal Threshold for Player who thinks Dealer is defensive: ${statistics.playerVsDefDealer.threshold}, which yields a win percentage of ${statistics.playerVsDefDealer.winPercent}%`
  // Fortsätt här - gör en output för att få en fin sträng. En annan för att ta ut värdet på threshold som sedan kan sättas in som parameter i Game.
  return descriptiveStatistics
}

module.exports.gatherData = gatherData