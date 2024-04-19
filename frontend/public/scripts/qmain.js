document.addEventListener("DOMContentLoaded", function () {
  // Example data
  const quizzes = [
    { number: 1, name: "what is Doraemon", itemCount: 10 },
    { number: 1, name: "what is Doraemon", itemCount: 10 },
    { number: 1, name: "what is Doraemon", itemCount: 10 },
    { number: 1, name: "what is Doraemon", itemCount: 10 },
    { number: 2, name: "nobita", itemCount: 5 },
    // ... other quizzes
  ];

  // Populate table with quizzes
  const quizList = document.getElementById("quiz-list");
  quizzes.forEach((quiz) => {
    let row = quizList.insertRow();
    row.innerHTML = `
        <td>${quiz.number}</td>
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
