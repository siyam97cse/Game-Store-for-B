// Get DOM elements
const targetColorElement = document.getElementById('target-color');
const colorOptionsElement = document.getElementById('color-options');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const bestScoreElement = document.getElementById('best-score');
const timerElement = document.getElementById('timer');
const restartButton = document.getElementById('restart-button');

let score = 0;
let timeLeft = 10;
let timerInterval;
let bestScore = localStorage.getItem('bestScore') || 0;

// Display the best score
bestScoreElement.textContent = bestScore;

// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to start the game
function startGame() {
  // Generate a target color
  const targetColor = getRandomColor();
  targetColorElement.style.backgroundColor = targetColor;

  // Generate color options
  const options = [targetColor];
  while (options.length < 3) {
    const randomColor = getRandomColor();
    if (!options.includes(randomColor)) {
      options.push(randomColor);
    }
  }

  // Shuffle the options
  options.sort(() => Math.random() - 0.5);

  // Clear previous options
  colorOptionsElement.innerHTML = '';

  // Create color option buttons
  options.forEach(color => {
    const colorOption = document.createElement('div');
    colorOption.classList.add('color-option');
    colorOption.style.backgroundColor = color;
    colorOption.addEventListener('click', () => checkAnswer(color, targetColor));
    colorOptionsElement.appendChild(colorOption);
  });
}

// Function to check the player's answer
function checkAnswer(selectedColor, targetColor) {
  if (timeLeft <= 0) return; // Stop if time is up

  if (selectedColor === targetColor) {
    resultElement.textContent = 'Correct!';
    resultElement.style.color = '#4a90e2';
    score++;
  } else {
    resultElement.textContent = 'Wrong! Try again.';
    resultElement.style.color = '#ff4c4c';
  }
  scoreElement.textContent = score;

  // Update best score
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
    bestScoreElement.textContent = bestScore;
  }

  startGame(); // Start a new round
}

// Function to update the timer
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerElement.textContent = timeLeft;
  } else {
    clearInterval(timerInterval);
    resultElement.textContent = 'Time\'s up! Final Score: ' + score;
    resultElement.style.color = '#333';
    colorOptionsElement.innerHTML = ''; // Disable further clicks
  }
}

// Function to restart the game
function restartGame() {
  clearInterval(timerInterval);
  score = 0;
  timeLeft = 10;
  scoreElement.textContent = score;
  timerElement.textContent = timeLeft;
  resultElement.textContent = '';
  startGame();
  timerInterval = setInterval(updateTimer, 1000);
}

// Start the game when the page loads
startGame();

// Start the timer
timerInterval = setInterval(updateTimer, 1000);

// Add event listener to the restart button
restartButton.addEventListener('click', restartGame);
