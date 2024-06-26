import { sendQuiz } from "./api.js";

let questions = [];

function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const choices = data.getAll("choices");
  const answer = parseInt(data.get("answer"), 10);

  const question = {
    name: data.get("qname"),
    choices: choices,
    answer: answer,
  };

  questions.push(question);

  // question.push(formJSON);
  var doc = document.getElementById("form");
  doc.reset();
  questionNumber++;
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("question-name").disabled = true;
  document.getElementById("question-name").style.backgroundColor = "lightgray";
  if (summit) {
    document.getElementById("option-modal").style.display = "flex";
    document.querySelector(".results pre").innerText = "";
    document.getElementById("question-name").disabled = false;
    document.getElementById("question-name").style.backgroundColor = "white";
    document.getElementById("question-name").value = "";
    questionNumber = 1;
    document.getElementById("question-number").innerHTML = questionNumber;
  }
}

let questionNumber = 1;
let summit = false;
window.canSummit = canSummit;
window.notSummitYet = notSummitYet;
window.closeOptionModal = closeOptionModal;

function canSummit() {
  summit = true;
}

function notSummitYet() {
  summit = false;
}

function closeOptionModal() {
  document.getElementById("option-modal").style.display = "none";
  summit = false;
}

const form = document.querySelector(".contact-form");
form.addEventListener("submit", handleFormSubmit);

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("question-number").innerHTML = questionNumber;
  const saveQuiz = document.getElementById("close");
  saveQuiz.addEventListener("click", async function (e) {
    e.preventDefault();
    const name = document.getElementById("question-name").value;
    let qs = questions; // No need to JSON.stringify here
    console.log(name);
    console.log(qs);
    try {
      const response = await sendQuiz(name, qs);
      console.log("Save successfully:", response);
      window.location.href = "main.html";
    } catch (error) {
      console.error("Save failed:", error);
    }
  });
});

export { canSummit, notSummitYet, closeOptionModal };
