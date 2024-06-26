import { BACKEND_URL } from "./config.js";

export async function createUser(username, password) {
  const response = await fetch(`${BACKEND_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function loginUser(username, password) {
  const response = await fetch(`${BACKEND_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (response.status === 200) {
    localStorage.setItem("username", data.username);
    localStorage.setItem("_id", data._id);
  }
}

export async function getQuiz() {
  const response = await fetch(`${BACKEND_URL}/quiz`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json(); // Parse the JSON response
  localStorage.setItem("quiz", JSON.stringify(data)); // Store the quiz data in localStorage
  return data;
}

export async function getUser() {
  const response = await fetch(`${BACKEND_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json(); // Parse the JSON response
  localStorage.setItem("userData", JSON.stringify(data)); // Store the quiz data in localStorage
  return data;
}

export async function sendQuiz(name, questions) {
  const response = await fetch(`${BACKEND_URL}/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      question: questions,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
}

export async function updateScore(username, scores) {
  const response = await fetch(`${BACKEND_URL}/user/update_score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, scores }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
