'use strict';

const MIN = 1;
const MAX = 20;
const INITIAL_SCORE = 20;
const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const updateScore = function () {
  if (score > 0) score--;
  document.querySelector('.score').textContent = score;
};
const restartScore = function () {
  score = INITIAL_SCORE;
  document.querySelector('.score').textContent = score;
};

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

let randomNumber = getRandomNumber(MIN, MAX);
let score = INITIAL_SCORE;
let highScore = 0;

document.querySelector('.again').addEventListener('click', function () {
  restartScore();
  randomNumber = getRandomNumber();
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //if guess==="" -> Number(guess) is 0 which is a falsy value
  if (!guess) {
    displayMessage('No Number!');
  } else {
    if (guess === randomNumber) {
      highScore = Math.max(highScore, score);
      document.querySelector('.highscore').textContent = highScore;

      document.querySelector('.number').textContent = randomNumber;
      displayMessage('Correct Number!');
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
    } else {
      updateScore();
      if (score > 0) {
        if (guess > randomNumber) {
          displayMessage('Too high');
        } else {
          displayMessage('Too low');
        }
      } else {
        displayMessage('You lost!');
      }
    }
  }
});
