import { getQuiz } from "./api.js";
function toQuiz(index) {
  const rawData = JSON.parse(localStorage.getItem("quiz") || "[]");
  const quizData = rawData[index];
  localStorage.setItem("selectedQuiz", JSON.stringify(quizData)); // Store the selected quiz data
  localStorage.setItem("quizIndex", index); // Store the index if needed elsewhere
  console.log(rawData);
  console.log(quizData);
  window.location.href = "quiz.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const rawData = JSON.parse(localStorage.getItem("quiz") || "[]");
  console.log(rawData);
  const quizzes = rawData.map((quiz, index) => ({
    id: index + 1,
    name: quiz.name,
    itemCount: quiz.question.length,
  }));
  // Populate table with quizzes
  const quizList = document.getElementById("quiz-list");
  quizzes.forEach((quiz, index) => {
    let row = quizList.insertRow();
    row.innerHTML = `
        <td>${quiz.id}</td>
        <td>${quiz.name}</td>
        <td>${quiz.itemCount}</td>
        <td><button class="play-btn">Play</button></td>
      `;
    row.cells[3].firstChild.addEventListener("click", function () {
      toQuiz(index);
    });
  });
});

// Search function to filter quizzes
function search() {
  let input = document.getElementById("search-input");
  let filter = input.value.toLowerCase();
  let quizList = document.getElementById("quiz-list");
  let tr = quizList.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[1]; // Assuming you want to search by quiz name
    if (td) {
      let txtValue = td.textContent || td.innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
window.search = search;

async function protectRoute() {
  if (!localStorage.getItem("username")) {
    window.location.href = "login.html";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  protectRoute();
  getQuiz();
});
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutButton");
  logoutBtn.addEventListener("click", async function () {
    try {
      localStorage.clear();
      window.location.href = "login.html"; // Redirect to login on successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  });
});
