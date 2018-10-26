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
  for (let i = startThreshold; i < endThreshold; i++) {
    let totalResult = {}
    let result = testGames(numberOfGames, i, defensiveThreshold)
    totalResult[i] = Math.round(result.playerWins / numberOfGames * 100)
    statistics.playerVsDefDealer += totalResult
    logResults += `Player Threshold: ${i}, Win ratio: ${Math.round(result.playerWins / numberOfGames * 100)}%` + '\n'
    // dealerWins += `Dealer Threshold: ${defensiveThreshold}, Win ratio: ${result.dealerWins / numberOfGames * 100}%` + '\n'
  }
  // Test Optimal Player Threshold if Dealers is deemed Offensive

  logResults += '\n\nPlayer vs Offensive Dealer:\n'
  for (let i = startThreshold; i < endThreshold; i++) {
    let totalResult = {}
    let result = testGames(numberOfGames, i, offensiveThreshold)
    totalResult[i] = Math.round(result.playerWins / numberOfGames * 100)
    statistics.playerVsOffDealer += totalResult
    logResults += `Player Threshold: ${i}, Win ratio: ${Math.round(result.playerWins / numberOfGames * 100)}%` + '\n'
    // dealerWins += `Dealer Threshold: ${offensiveThreshold}, Win ratio: ${result.dealerWins / numberOfGames * 100}%` + '\n'
  }
  // Test Optimal Dealer Threshold if Player is deemed Defensive
  logResults += '\n\nDealer vs Defensive Player:\n'
  for (let i = startThreshold; i < endThreshold; i++) {
    let totalResult = {}
    let result = testGames(numberOfGames, defensiveThreshold, i)
    totalResult[i] = Math.round(result.playerWins / numberOfGames * 100)
    statistics.dealerVsDefPlayer += totalResult
    // playerWins += `Player Threshold: ${defensiveThreshold}, Win ratio: ${result.playerWins / numberOfGames * 100}%` + '\n'
    logResults += `Dealer Threshold: ${i}, Win ratio: ${Math.round(result.dealerWins / numberOfGames * 100)}%` + '\n'
  }
  // Test Optimal Dealer Threshold if Player is deemed Offensive
  logResults += '\n\nDealer vs Offensive Player:\n'
  for (let i = startThreshold; i < endThreshold; i++) {
    let totalResult = {}
    let result = testGames(numberOfGames, offensiveThreshold, i)
    totalResult[i] = Math.round(result.playerWins / numberOfGames * 100)
    statistics.dealerVsOffPlayer += totalResult
    // playerWins += `Player Threshold: ${offensiveThreshold}, Win ratio: ${result.playerWins / numberOfGames * 100}%` + '\n'
    logResults += `Dealer Threshold: ${i}, Win ratio: ${Math.round(result.dealerWins / numberOfGames * 100)}%` + '\n'
  }
  console.log(logResults)
  let optimumThresholds = {
    defensiveDealer: 0,
    offensiveDealer: 0,
    defensivePlayer: 0,
    offensivePlayer: 0
  }
  return statistics
}

module.exports.gatherData = gatherData
