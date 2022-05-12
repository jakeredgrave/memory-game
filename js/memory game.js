let board = document.getElementById("board");
let score = document.getElementById("score");
let fails = document.getElementById("fails");
let cards = document.querySelectorAll(".card");

let resetButton = document.getElementById("reset_button");
// add eventListener to reset button
resetButton.addEventListener("click", hideCards);

// add eventListener to every card
for (let i = 0; i < 6; i++) {
  cards[i].addEventListener("click", revealCard);
}

let revealCounter = 2;
let imgAltArray = [];
let latestTwoRevealedCards = [];
let points = 0;
let wrongGuesses = 0;

function revealCard(event) {
  if (revealCounter > 0) {
    let cardImg = event.target.firstChild;
    // make card "flip", so you can see the picture
    cardImg.style.visibility = "visible";

    imgAltArray.push(cardImg.alt);
    latestTwoRevealedCards.push(cardImg);
    console.log(imgAltArray);

    revealCounter--;
    // check if both cards have the same picture on them by comparing alt parameters
    if (revealCounter == 0 && imgAltArray[0] === imgAltArray[1]) {
      imgAltArray = [];
      latestTwoRevealedCards = [];
      points++;
      score.textContent = points;
      revealCounter = 2;
    } else if (
      revealCounter == 0 &&
      imgAltArray !== [] &&
      imgAltArray[0] !== imgAltArray[1]
    ) {
      wrongGuesses++;
      fails.textContent = wrongGuesses;
      imgAltArray = [];
      // make cards flip back
      setTimeout(flipBack, 1000);
    }
  }
}

function flipBack() {
  for (let i = 1; i >= 0; i--) {
    latestTwoRevealedCards[i].style.visibility = "hidden";
  }
  latestTwoRevealedCards = [];
  revealCounter = 2;
}

function hideCards() {
  for (let i = 0; i < 6; i++) {
    cards[i].firstChild.style.visibility = "hidden";
  }
  revealCounter = 2;
  points = 0;
  wrongGuesses = 0;
  score.textContent = 0;
  fails.textContent = 0;
  imgAltArray = [];
  console.log(imgAltArray);
  console.log(revealCounter);
  //let cardImg = document.getElementById('card1');
  //console.log(cards.firstChild);
}
