let currentPage = 1;
const itemsPerPage = 10; // Change as needed for items per page

let globalQuizzes = [];
let leaderboardData = {};
// Dummy leaderboard data
document.addEventListener("DOMContentLoaded", function () {
  const rawData = JSON.parse(localStorage.getItem("quiz") || "[]");
  console.log(rawData);
  globalQuizzes = rawData.map((quiz, index) => ({
    id: index + 1,
    name: quiz.name,
  }));
  const quizNameToId = {};
  globalQuizzes.forEach((quiz) => {
    quizNameToId[quiz.name] = quiz.id;
  });
  console.log(globalQuizzes);
  globalQuizzes.forEach((quiz) => {
    leaderboardData[quiz.id] = []; // Initialize each quiz ID with an empty array
  });
  console.log(leaderboardData);
  const userData = JSON.parse(localStorage.getItem("userData") || "[]");
  Object.values(userData).forEach((user) => {
    if (user.scores) {
      Object.entries(user.scores).forEach(([quizName, score]) => {
        const quizId = quizNameToId[quizName];
        if (quizId && leaderboardData[quizId]) {
          leaderboardData[quizId].push({
            rank: 0,
            name: user.username,
            score: score,
          });
          leaderboardData[quizId].sort((a, b) => b.score - a.score); // Sort descending by score
          leaderboardData[quizId].forEach((entry, index) => {
            entry.rank = index + 1; // Reassign ranks
          });
        }
      });
    }
  });
  // console.log(leaderboardData);
});

function updateLeaderboards() {
  // Create a new leaderboard based on usernames and scores from localStorage
  Object.values(localStorageData).forEach((user) => {
    if (user.scores) {
      Object.entries(user.scores).forEach(([quizName, score]) => {
        const quizId = quizNameToId[quizName];
        if (quizId && leaderboardData[quizId]) {
          leaderboardData[quizId].push({
            rank: 0,
            name: user.username,
            score: score,
          });
          leaderboardData[quizId].sort((a, b) => b.score - a.score); // Sort descending by score
          leaderboardData[quizId].forEach((entry, index) => {
            entry.rank = index + 1; // Reassign ranks
          });
        }
      });
    }
  });
  console.log(leaderboardData);
}

// Function to populate the select dropdown with quiz options
function populateQuizSelect() {
  const select = document.getElementById("quiz-select");
  globalQuizzes.forEach((quiz) => {
    let option = document.createElement("option");
    option.value = quiz.id;
    option.textContent = quiz.name;
    select.appendChild(option);
  });
  loadLeaderboard();
}

// Function to load the leaderboard for the selected quiz
function loadLeaderboard() {
  const selectedQuizId = document.getElementById("quiz-select").value;
  const leaderboardEntries = leaderboardData[selectedQuizId];
  const leaderboardList = document.getElementById("leaderboard-list");

  // Clear existing leaderboard entries
  leaderboardList.innerHTML = "";

  // Create table element
  let table = document.createElement("table");
  table.className = "leaderboard-table";

  // Create and append header row
  let headerRow = document.createElement("tr");
  headerRow.innerHTML = `
      <th>Rank</th>
      <th>Name</th>
      <th>Score</th>
    `;
  table.appendChild(headerRow);

  // Determine the subset of data to show
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let paginatedItems = leaderboardEntries.slice(start, end);

  // Add leaderboard entries to the table
  paginatedItems.forEach((entry) => {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${entry.rank}</td>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
      `;
    table.appendChild(row);
  });

  leaderboardList.appendChild(table);

  // Update the pagination controls
  updatePaginationControls(leaderboardEntries.length);
}

// Function to create and update pagination controls
function updatePaginationControls(totalItems) {
  const paginationControls = document.getElementById("pagination-controls");
  paginationControls.innerHTML = ""; // Clear existing controls

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Add buttons for each page
  for (let i = 1; i <= totalPages; i++) {
    let pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.onclick = function () {
      currentPage = i;
      loadLeaderboard();
    };
    if (currentPage === i) {
      pageBtn.disabled = true; // Disable the current page button
    }
    paginationControls.appendChild(pageBtn);
  }
}

// Initial population of the quiz select dropdown on page load
document.addEventListener("DOMContentLoaded", populateQuizSelect);
