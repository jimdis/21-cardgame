'use strict'

let hand = []

function drawCard () {
  let card = 9
  return hand.push(card)
}

function handSum () {
  return hand.reduce((a, b) => a + b)
}

function playerChoice () {
  let playerHand
  let threshold = 19
  do {
    drawCard()
    playerHand = handSum()
  } while (playerHand < threshold)
  if (playerHand > 21) {
    return 'Player is Bust'
  } else if (playerHand === 21) {
    return 'Player Wins'
  } else return playerHand
}

// drawCard()
// drawCard()
// drawCard()
// console.log(hand)
// console.log(handSum())
console.log(hand)
console.log(playerChoice())
console.log(hand)
