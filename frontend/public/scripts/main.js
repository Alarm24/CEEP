<<<<<<< HEAD
import { createUser, loginUser } from "./api.js";

=======
>>>>>>> 80d42e3fb9cb8fa69c73b8b64e8fffc86f70f92c
document.addEventListener("DOMContentLoaded", function () {
  // Example data
  const quizzes = [
    { id: 1, name: "what is Doraemon", itemCount: 10 },
    { id: 1, name: "what is Doraemon", itemCount: 10 },
    { id: 1, name: "what is Doraemon", itemCount: 10 },
    { id: 1, name: "what is Doraemon", itemCount: 10 },
    { id: 2, name: "nobita", itemCount: 5 },
    // ... other quizzes
  ];
  // Populate table with quizzes
  const quizList = document.getElementById("quiz-list");
  quizzes.forEach((quiz) => {
    let row = quizList.insertRow();
    row.innerHTML = `
        <td>${quiz.id}</td>
        <td>${quiz.name}</td>
        <td>${quiz.itemCount}</td>
        <td><button class="play-btn">Play</button></td>
      `;
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
});
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutButton");
  logoutBtn.addEventListener("click", async function () {
    try {
      localStorage.removeItem("username");
      window.location.href = "login.html"; // Redirect to login on successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  });
});
