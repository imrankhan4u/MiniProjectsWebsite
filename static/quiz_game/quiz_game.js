const questions = [
  { question: "What is 35 + 48?", answer: "83" },
  { question: "If a car travels 60 miles in 1 hour, how far will it travel in 4 hours?", answer: "240" },
  { question: "What is the square root of 144?", answer: "12" },
  { question: "If a train moves at 50 km/h, how much hours will it take to travel 100 km?", answer: "2" },
  { question: "A bag contains 5 red, 7 blue, and 8 green balls. What is the total number of balls?", answer: "20" }
];

let currentQuestion = 0;
let score = 0;
let answers = [];

function loadQuestion() {
  if (currentQuestion < questions.length) {
    document.getElementById("question").textContent = questions[currentQuestion].question;
    document.getElementById("answer").value = "";
    document.getElementById("question-count").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  } else {
    displayScore();
  }
}

function submitAnswer() {
  const userAnswer = document.getElementById("answer").value.trim();
  const correctAnswer = questions[currentQuestion].answer;

  answers.push({
    question: questions[currentQuestion].question,
    correctAnswer: correctAnswer,
    userAnswer: userAnswer,
    isCorrect: userAnswer.toLowerCase() === correctAnswer.toLowerCase()
  });

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
  }
  currentQuestion++;
  loadQuestion();
}

function displayScore() {
  let resultHTML = `<h2>Your score: ${score}/${questions.length}</h2><ul>`;
  
  answers.forEach(answer => {
    const status = answer.isCorrect ? "Correct" : "Incorrect";
    const color = answer.isCorrect ? "green" : "red";
    resultHTML += `
      <li style="text-align: left; color: ${color};">
        <strong>Question:</strong> ${answer.question}<br>
        <strong>Your Answer:</strong> ${answer.userAnswer} <br>
        <strong>Correct Answer:</strong> ${answer.correctAnswer} <br>
        <strong>Status:</strong> ${status}
      </li>`;
  });

  resultHTML += `<button onclick="restartQuiz()">Restart</button></ul>`;
  document.getElementById("quiz").innerHTML = resultHTML;
}

function restartQuiz() {
  window.location.reload();
}

document.addEventListener("DOMContentLoaded", loadQuestion);
