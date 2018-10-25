'use strict'

function calculateScore (hand) {
  let arr = []
  let score = 0
  // 1: Calculate score without Aces:
  for (let i = 0; i < hand.length; i++) {
    arr.push(scoreRank(hand[i].rank))
  }
  score = arr.reduce((a, b) => a + b)
  // 2: Calculate score with Aces:
  let aces = hand.filter(card => card.rank === 'A')
  if (aces.length === 0) {
    return score
  } else return scoreAces(aces, score)
}

function scoreRank (rank) {
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

function toString (player, dealer) {
  let whitespace = player.name.length - dealer.name.length
  let result = `${player.name}: ${player.renderHand()} (${player.score}) ${(player.score > 21) ? 'BUSTED!' : ''}`
  if (dealer.score > 0) {
    result += '\n' + 'Dealer: ' + ' '.repeat(whitespace) + `${dealer.renderHand()} (${dealer.score}) ${(dealer.score > 21) ? 'BUSTED!' : ''}`
  }
  if (player.score > 21) {
    result += '\n' + `Player is Bust, Dealer Wins!` + '\n\n'
  } else if (player.score === 21) {
    result += '\n' + `Player Wins with 21!` + '\n\n'
  } else if (player.hand.length === 5) {
    result += '\n' + `Player wins with 5 cards < 21!` + '\n\n'
  } else if (player.score > dealer.score) {
    result += '\n' + `Player wins with ${player.score} vs dealer's ${dealer.score}.` + '\n\n'
  } else if (dealer.score > 21) {
    result += '\n' + `Dealer is Bust, Player Wins!` + '\n\n'
  } else if (dealer.score === 21) {
    result += '\n' + `Dealer Wins with 21!` + '\n\n'
  } else if (dealer.score >= player.score) {
    result += '\n' + `Dealer Wins with ${dealer.score} vs player's ${player.score}` + '\n\n'
  }
  return result
}

module.exports.calculateScore = calculateScore
module.exports.toString = toString
