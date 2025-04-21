'use strict';

let diceRoll, gameOver, firstPlayer, secondPlayer;
const diceImage = document.querySelector('.dice');
const firstPlayerElement = document.querySelector('.player--0');
const secondPlayerElement = document.querySelector('.player--1');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

const hideDice = function () {
  diceImage.classList.add('hidden');
};

const showDice = function () {
  diceImage.classList.remove('hidden');
};

const gameInit = function () {
  gameOver = false;

  firstPlayer = {
    id: 0,
    currentScore: 0,
    totalScore: 0,
    isCurrentTurn: true,
  };
  secondPlayer = {
    id: 1,
    currentScore: 0,
    totalScore: 0,
    isCurrentTurn: false,
  };

  firstPlayerElement.classList.add('player--active');
  secondPlayerElement.classList.remove('player--active');
  firstPlayerElement.classList.remove('player--winner');
  secondPlayerElement.classList.remove('player--winner');

  hideDice();
  updateScreenScores();
};

const switchTurn = function () {
  if (firstPlayer.isCurrentTurn) {
    firstPlayer.isCurrentTurn = false;
    secondPlayer.isCurrentTurn = true;
  } else {
    firstPlayer.isCurrentTurn = true;
    secondPlayer.isCurrentTurn = false;
  }
  firstPlayerElement.classList.toggle('player--active');
  secondPlayerElement.classList.toggle('player--active');
};

const getCurrentPlayer = () =>
  firstPlayer.isCurrentTurn ? firstPlayer : secondPlayer;

const updateScreenScores = function () {
  document.querySelector('#score--0').textContent = firstPlayer.totalScore;
  document.querySelector('#score--1').textContent = secondPlayer.totalScore;
  document.querySelector('#current--0').textContent = firstPlayer.currentScore;
  document.querySelector('#current--1').textContent = secondPlayer.currentScore;
};

const rollDice = function () {
  diceRoll = Math.floor(Math.random() * 6) + 1;
  diceImage.src = `images/dice-${diceRoll}.png`;
  showDice();
  return diceRoll;
};

gameInit();

rollDiceBtn.addEventListener('click', function () {
  if (!gameOver) {
    diceRoll = rollDice();
    const currentPlayer = getCurrentPlayer();
    if (diceRoll === 1) {
      currentPlayer.currentScore = 0;
      switchTurn();
    } else {
      currentPlayer.currentScore += diceRoll;
    }
    updateScreenScores();
  }
});
holdBtn.addEventListener('click', function () {
  if (!gameOver) {
    const currentPlayer = getCurrentPlayer();
    currentPlayer.totalScore += currentPlayer.currentScore;
    currentPlayer.currentScore = 0;
    updateScreenScores();
    if (currentPlayer.totalScore >= 100) {
      gameOver = true;
      hideDice();
      document
        .querySelector(`.player--${currentPlayer.id}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer.id}`)
        .classList.remove('player--active');
    } else {
      switchTurn();
    }
  }
});

newGameBtn.addEventListener('click', gameInit);
