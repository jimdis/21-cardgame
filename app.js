'use strict'

let playerHand = []
let dealerHand = []
let playerHandSum = 0
let dealerHandSum = 0

function drawCard (who) {
  let card = Math.floor(Math.random() * 14) + 1
  return who.push(card)
}

function handSum (who) {
  return who.reduce((a, b) => a + b)
}

function playerDraw () {
  let threshold = 15
  do {
    drawCard(playerHand)
    playerHandSum = handSum(playerHand)
  } while (playerHandSum < threshold)
  return playerHandSum
}

function dealerDraw () {
  if (playerHandSum < 21) {
    do {
      drawCard(dealerHand)
      dealerHandSum = handSum(dealerHand)
    } while (dealerHandSum < playerHandSum)
  }
  return dealerHandSum
}

function compareHands () {
  if (playerHandSum > 21) {
    return 'Player is Bust, Dealer Wins'
  } else if (playerHandSum === 21) {
    return '21! Player Wins'
  } else if (dealerHandSum > 21) {
    return 'Dealer is Bust, Player Wins'
  } else return `Dealer Wins with ${dealerHandSum} vs player's ${playerHandSum}`
}

// drawCard()
// drawCard()
// drawCard()
// console.log(hand)
// console.log(handSum())
console.log(playerDraw())
console.log(playerHand)
console.log(dealerDraw())
console.log(dealerHand)
console.log(compareHands())
