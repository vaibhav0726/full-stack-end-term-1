const cards = document.querySelectorAll(".card");
var count = 6;
let hasFlippedCards = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  this.classList.toggle("flip");

  if (hasFlippedCards == false) {
    hasFlippedCards = true;
    firstCard = this;

    console.log(hasFlippedCards, firstCard);
    return;
  }
  hasFlippedCards = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.name == secondCard.dataset.name) {
    count = count - 1;
    document.getElementById("c").innerHTML = count;
    disableCards();
  } else {
    unFlipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCards, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
cards.forEach((card) => card.addEventListener("click", flipCard));
