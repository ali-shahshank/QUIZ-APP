const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our Solar System?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "What is the square root of 64?",
    answers: [
      { text: "4", correct: false },
      { text: "8", correct: true },
      { text: "16", correct: false },
      { text: "32", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "CO2", correct: false },
      { text: "O2", correct: false },
      { text: "H2O", correct: true },
      { text: "HO", correct: false },
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "J.K. Rowling", correct: false },
    ],
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Seoul", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "What is the smallest prime number?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },
  {
    question: "What is the currency of the United Kingdom?",
    answers: [
      { text: "Dollar", correct: false },
      { text: "Euro", correct: false },
      { text: "Pound Sterling", correct: true },
      { text: "Yen", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
];

// DOM Elements
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// State Variables
let currentQuestionIndex = 0;
let score = 0;

// Initialize the Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none";
  showQuestion();
}

// Display the Current Question
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${
    currentQuestion.question
  }`;

  currentQuestion.answers.forEach((answer) => {
    const button = createAnswerButton(answer);
    answerElement.appendChild(button);
  });
}

// Create Answer Button
function createAnswerButton(answer) {
  const button = document.createElement("button");
  button.innerHTML = answer.text;
  button.classList.add("btn");
  button.dataset.correct = answer.correct;
  button.addEventListener("click", selectAnswer);
  return button;
}

// Reset State Before Displaying New Question
function resetState() {
  nextButton.style.display = "none";
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}

// Handle Answer Selection
function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  updateScore(isCorrect);
  highlightAnswers();
  nextButton.style.display = "block"; // Show Next Button
}

// Update Score
function updateScore(isCorrect) {
  if (isCorrect) {
    score++;
  }
}

// Highlight Correct/Incorrect Answers
function highlightAnswers() {
  Array.from(answerElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true; // Disable all buttons after selection
  });
}

// Handle Next Button Click
nextButton.addEventListener("click", handleNextButton);

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Show Final Score
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again!";
  nextButton.style.display = "block";

  // Add an event listener to restart the quiz when the button is clicked
  nextButton.onclick = startQuiz; // Reset quiz and start again
}

// Start the Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none";
  showQuestion();
}

// Other functions remain unchanged...
startQuiz();
