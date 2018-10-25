'use strict'

function calculateScore (hand) {
  let arr = []
  let score = 0
  for (let i = 0; i < hand.length; i++) {
    arr.push(scoringTable(hand[i].rank))
  }
  // if (arr.length > 0) {
  score = arr.reduce((a, b) => a + b)
  // }
  let aces = hand.filter(obj => obj.rank === 'A') // TESTA BYTA NAMN PÅ obj TILL card
  if (aces.length === 0) {
    return score
  } else return scoreAces(aces, score)
}

function scoringTable (rank) {
  if (typeof rank === 'number') {
    return rank
  } else if (rank === 'J') {
    return 11
  } else if (rank === 'Q') {
    return 12
  } else if (rank === 'K') {
    return 13
  } else return 0
}

function scoreAces (aces, score) {
  for (let i = 0; i < aces.length; i++) {
    if (score + 14 + aces.length - i <= 21) {
      score += 14
    } else score += 1
  }
  return score
}

module.exports.calculateScore = calculateScore
