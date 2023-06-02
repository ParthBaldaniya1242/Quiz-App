const questions = [
  {
    question: "What is the scientific name of a butterfly?",
    answers: [
    {text :  "Apis", correct : "false"}, 
    {text :  "Coleoptera", correct : "false"}, 
    {text :  "Formicidae", correct : "false"}, 
    {text :  "Rhopalocera", correct : "true"},
    ]
  },
  {
    question: "Who are the actors in The Internship?",
    answers: [
    {text :  "Ben Stiller, Jonah Hill", correct : "false"},
    {text :  "Courteney Cox, Matt LeBlanc", correct : "false"},
    {text :  "Kaley Cuoco, Jim Parsons", correct : "false"},
    {text :  "Vince Vaughn, Owen Wilson", correct : "true"},
    ]
  },
  {
    question:
      "What are the school colors of the University of Texas at Austin?",
    answers: [
    {text :  "Black, Red", correct : "false"},
    {text :  "Blue, Orange", correct : "false"},
    {text :  "White, Burnt Orange", correct : "true"},
    {text :  "White, Old gold, Gold", correct : "false"},
    ]
  },
  {
    question: "When was Mahatma Gandhi born?",
    answers: [
    {text :  "October 2, 1869", correct : "true"},
    {text :  "December 15, 1872", correct : "false"},
    {text :  "July 18, 1918", correct : "false"},
    {text :  "January 15, 1929", correct : "false"},
    ]
  },
  {
    question: "How far is the moon from Earth?",
    answers: [
    {text :  "7,918 miles (12,742 km)", correct : "false"},
    {text :  "86,881 miles (139,822 km)", correct : "false"},
    {text :  "238,400 miles (384,400 km)", correct : "true"},
    {text :  "35,980,000 miles (57,910,000 km)", correct : "false"},
    ]
  
  },
  {
    question: "How tall is Mount Everest?",
    answers: [
    {text :  "6,683 ft (2,037 m)", correct : "false"},
    {text :  "7,918 ft (2,413 m)", correct : "false"},
    {text :  "19,341 ft (5,895 m)", correct : "false"},
    {text :  "29,029 ft (8,847 m)", correct : "true"},
    ]
  
  },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}.`
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
 }

function handleNextButton() { 
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
