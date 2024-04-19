let currentPage = 1;
const itemsPerPage = 10; // Change as needed for items per page

// Dummy data for quizzes
const quizzes = [
  { id: "1", name: "General Knowledge" },
  { id: "2", name: "Science and Nature" },
];
// Dummy leaderboard data
const leaderboardData = {
  1: [
    { rank: 1, name: "Alice Johnson", score: 150 },
    { rank: 2, name: "Bob Smith", score: 145 },
    { rank: 3, name: "Carol Danvers", score: 140 },
    { rank: 1, name: "Alice Johnson", score: 150 },
    { rank: 2, name: "Bob Smith", score: 145 },
    { rank: 3, name: "Carol Danvers", score: 140 },
    { rank: 1, name: "Alice Johnson", score: 150 },
    { rank: 2, name: "Bob Smith", score: 145 },
    { rank: 3, name: "Carol Danvers", score: 140 },
    { rank: 1, name: "Alice Johnson", score: 150 },
    { rank: 2, name: "Bob Smith", score: 145 },
    { rank: 3, name: "Carol Danvers", score: 140 },
  ],
  2: [
    { rank: 1, name: "Dave Brown", score: 155 },
    { rank: 2, name: "Eve Davis", score: 150 },
    { rank: 3, name: "Frank Castle", score: 145 },
  ],
};

// Function to populate the select dropdown with quiz options
function populateQuizSelect() {
  const select = document.getElementById("quiz-select");
  quizzes.forEach((quiz) => {
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

// You would call loadLeaderboard() when the dropdown selection changes
