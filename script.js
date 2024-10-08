const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessage = document.querySelector('.winning-message');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const board = document.querySelector('#board');
const restartButton = document.querySelector('#restart-button');
const xScore = document.querySelector('#x-score');
const circleScore = document.querySelector('#circle-score');
let circleTurn;
let circlePoints = 0;
let xPoints = 0;

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass();
  winningMessage.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  winningMessage.classList.add('show');
  if (draw) {
    winningMessageText.innerText = `It's a draw!`
  } else {
    winningMessageText.innerText = `${circleTurn ? 'O' : 'X'} is the winner!`
    updateScore();
  }
}

function updateScore() {
  circleTurn ? circlePoints++ : xPoints++;
  circleScore.innerText = circlePoints;
  xScore.innerText = xPoints;
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) ||
    cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
