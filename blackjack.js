var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;
var decksize = 0;
var deck;

var canHit = true; //allows the player (you) to draw while yourSum <= 21
var canreplay = false; //replay button
window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];
  for (let d = 0; d < 6; d++) {
    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < values.length; j++) {
        deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
      }
    } // Can add another loop for bigger shoe rather than just 1 deck
    // console.log(deck);
    decksize = deck.length;
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  //   console.log(deck);
}

function startGame() {
  let backedImg = document.createElement("img");
  backedImg.src = "./cards/BACK.png";
  backedImg.setAttribute("id", "hidden");

  canreplay = false;
  backed = deck.pop();
  dealerSum += getValue(backed);
  dealerAceCount += checkAce(backed);
  document.getElementById("dealer-cards").append(backedImg);
  // console.log(dealerSum);
  while (dealerSum < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }
  //   console.log(dealerSum);

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
  }

  //   console.log(yourSum);
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
  document.getElementById("replay").addEventListener("click", replay);
}

function hit() {
  if (!canHit) {
    return;
  }

  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {
    //A, J, 8 -> 1 + 10 + 8
    canHit = false;
  }
}

function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./cards/" + backed + ".png";

  let message = "";
  if (yourSum > 21) {
    message = "You Lose!";
  } else if (dealerSum > 21) {
    message = "You win!";
  }
  //both you and dealer <= 21
  else if (yourSum == dealerSum) {
    message = "Tie!";
  } else if (yourSum > dealerSum) {
    message = "You Win!";
  } else if (yourSum < dealerSum) {
    message = "You Lose!";
  }
  canreplay = true;
  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;

  //   console.log(canreplay);
}
function replay() {
  console.log(deck.length);
  if (canreplay) {
    if (deck.length < decksize * 0.1) {
      buildDeck();
      shuffleDeck();
    }
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    document.getElementById("dealer-sum").innerText = "";
    document.getElementById("your-sum").innerText = "";
    document.getElementById("results").innerText = "";
    const yourCards = document.getElementById("your-cards");
    yourCards.replaceChildren();
    const dealerCards = document.getElementById("dealer-cards");
    dealerCards.replaceChildren();
    const hid = document.getElementById("hidden");
    dealerCards.replaceChildren();
    startGame();
  }
}

function getValue(card) {
  let data = card.split("-"); // "4-C" -> ["4", "C"]
  let value = data[0];

  if (isNaN(value)) {
    //A J Q K
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}
