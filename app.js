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

function handSum (hand) {
  hand.forEach(element => { element.convert(playerHandSum) }) // måste tänka om här - vill inte modifiera objektets rank, bara räkna ut en summa.
  return hand.reduce((a, b) => a + b.rank, 0)
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
