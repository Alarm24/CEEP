function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  // for multi-selects, we need special handling
  // formJSON.snacks = data.getAll('snacks');

  const results = document.querySelector('.results pre');
  results.innerText = JSON.stringify(formJSON, null, 2);
  question.push(results.innerText)
  console.log(question)
  var doc = document.getElementById("form");
  doc.reset()
  document.getElementById("question-name").disabled = true;
}

let questionNumber = 0

function nextQuestion(){
  questionNumber++;
  document.getElementById("question-number").innerHTML = questionNumber
}

function backToMainPage(){

}

const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);
let question = [];