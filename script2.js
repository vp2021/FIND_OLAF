const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const highScoreBoard = document.querySelector('.highScore');
const backgroundAudio = document.getElementById('background-audio'); 
const gameOverMusic = document.getElementById('gameoverMusic');
let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;
let highScore = localStorage.getItem('game1HighScore') || 0;
highScoreBoard.textContent = 'HIGH SCORE: ' + highScore;

function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
    return pickRandomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function popOut() {
  if (timeUp) return;
  const time = Math.random() * 1500 + 800;
  const hole = pickRandomHole(holes);
  hole.classList.add('up');
  setTimeout(function () {
    hole.classList.remove('up');
    if (!timeUp) popOut();
  }, time);
}

function startGame() {
  countdown = timeLimit / 1000;
  scoreBoard.textContent = 0;
  scoreBoard.style.display = 'block';
  countdownBoard.textContent = countdown;
  timeUp = false;
  score = 0;
  

  backgroundAudio.play();

  popOut();

  const startCountdown = setInterval(function () {
    countdown -= 1;
    countdownBoard.textContent = countdown;
    if (countdown <= 0) {
      countdown = 0;
      clearInterval(startCountdown);
      checkHighScore();
      countdownBoard.textContent = "Time's UP!!";
      backgroundAudio.pause();
      gameOverMusic.play();
      timeUp = true;
    }
  }, 1000);
}

startButton.addEventListener('click', startGame);

function olafScore(e) {
  score++;
  this.style.pointerEvents = 'none';
  setTimeout(() => {
    this.style.pointerEvents = 'all';
  }, 800);
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener('click', olafScore));

function checkHighScore() {
  if(score > localStorage.getItem('game1HighScore')){
      localStorage.setItem('game1HighScore',score);
      highScore = score;
      highScoreBoard.textContent = 'HIGH SCORE: ' + highScore;
  }
}