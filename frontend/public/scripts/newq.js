function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  // for multi-selects, we need special handling
  formJSON.option = data.getAll("option");
  formJSON.correctOption = parseInt(data.getAll("correctOption"));

  const results = document.querySelector(".results pre");
  results.innerText = JSON.stringify(formJSON, null, 2);
  question.push(results.innerText);
  console.log(question);
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

function load() {
  document.getElementById("question-number").innerHTML = questionNumber;
}

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
let question = [];
