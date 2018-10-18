'use strict'

const Card = require('./src/Card')
const deck = require('./src/deck')

let playerHand = []
let dealerHand = []
let playerHandSum = 0
let dealerHandSum = 0

function drawCard (who) {
  let card = deck.pop()
  return who.push(card)
}
let testHand = [{ suit: 'heart', rank: 3 }, { suit: 'spades', rank: 2 }]
handSum(testHand)

function handSum (hand) {
  let rankedHand = []
  for (let i = 0; i < hand.length; i++) {
    rankedHand.push(hand[i].rank) // fixa så klädda kort blir värden
  }
  console.log(rankedHand)
  // return rankedHand.reduce((a, b) => a + b.rank, 0)
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

console.log(deck)
console.log(playerDraw())
console.log(playerHand)
console.log(dealerDraw())
console.log(dealerHand)
console.log(compareHands())

// let card1 = new Card('HEJ', 'K')
// console.log(card1)
// card1.convert(9)
// console.log(card1)
