import { updateScore } from "./api.js";
var questions = [];
document.addEventListener("DOMContentLoaded", function () {
  const rawData = JSON.parse(localStorage.getItem("selectedQuiz") || "[]");
  console.log(rawData);
  questions = rawData.question.map((quiz) => ({
    question: quiz.name,
    choices: quiz.choices,
    answer: quiz.answer,
  }));
  document.getElementById("total-question").innerHTML = questions.length;
});

let shuffledQuestions = []; //empty array to hold shuffled selected questions

function handleQuestions() {
  //function to shuffle and push 10 questions to shuffledQuestions array
  for (let i = 0; i < questions.length; i++) {
    shuffledQuestions.push(questions[i]);
  }
}

let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

// function for displaying next question in the array to dom
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("display-question").innerHTML =
    currentQuestion.question;
  document.getElementById("option-one-label").innerHTML =
    currentQuestion.choices[0];
  document.getElementById("option-two-label").innerHTML =
    currentQuestion.choices[1];
  document.getElementById("option-three-label").innerHTML =
    currentQuestion.choices[2];
  document.getElementById("option-four-label").innerHTML =
    currentQuestion.choices[3];
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; //gets current Question
  const currentQuestionAnswer = currentQuestion.answer.toString(); //gets current Question's answer
  const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      //get's correct's radio input with correct answer
      correctOption = option.labels[0].id;
    }
  });

  //checking to make sure a radio input has been checked or an option being chosen
  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById("option-modal").style.display = "flex";
  }

  //checking if checked radio button is same as answer
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      playerScore++;
      indexNumber++;
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      wrongAttempt++;
      indexNumber++;
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}
function handleNextQuestion() {
  checkForAnswer();
  unCheckRadioButtons();
  //delays next question displaying for a second
  setTimeout(() => {
    if (indexNumber <= questions.length - 1) {
      NextQuestion(indexNumber);
    } else {
      handleEndGame();
    }
    resetOptionBackground();
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = "";
  });
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// function for when all questions being answered
function handleEndGame() {
  let remark = null;
  let remarkColor = null;
  let fullScore = questions.length;
  // condition check for player remark and remark color
  if (playerScore <= 0.3 * fullScore) {
    remark = "Bad Grades, Keep Practicing.";
    remarkColor = "red";
  } else if (playerScore >= 0.4 * fullScore && playerScore < 7 * fullScore) {
    remark = "Average Grades, You can do better.";
    remarkColor = "orange";
  } else if (playerScore >= 0.7 * fullScore) {
    remark = "Excellent, Keep the good work going.";
    remarkColor = "green";
  }
  const playerGrade = (playerScore / questions.length) * 100;

  //data to display to score board
  document.getElementById("remarks").innerHTML = remark;
  document.getElementById("remarks").style.color = remarkColor;
  document.getElementById("grade-percentage").innerHTML = playerGrade;
  document.getElementById("wrong-answers").innerHTML = wrongAttempt;
  document.getElementById("right-answers").innerHTML = playerScore;
  document.getElementById("score-modal").style.display = "flex";
}

//closes score modal and resets game
function closeScoreModal() {
  // localStorage.removeItem("selectedQuiz");
  const username = localStorage.getItem("username");
  const rawData = JSON.parse(localStorage.getItem("selectedQuiz") || "[]");
  const question_name = rawData.name;
  let scores = {
    [question_name]: playerScore,
  };
  updateScore(username, scores);
  document.getElementById("score-modal").style.display = "none";
}

function tryAgain() {
  questionNumber = 1;
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById("score-modal").style.display = "none";
}

//function to close warning modal
function closeOptionModal() {
  document.getElementById("option-modal").style.display = "none";
}
// async function updateScore(playerScore) {
//   const id = localStorage.getItem("_id");
//   await updateScore(id, playerScore);
// }
window.handleQuestions = handleQuestions;
window.NextQuestion = NextQuestion;
window.checkForAnswer = checkForAnswer;
window.handleNextQuestion = handleNextQuestion;
window.resetOptionBackground = resetOptionBackground;
window.unCheckRadioButtons = unCheckRadioButtons;
window.handleEndGame = handleEndGame;
window.tryAgain = tryAgain;
window.closeScoreModal = closeScoreModal;
window.closeOptionModal = closeOptionModal;
