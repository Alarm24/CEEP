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
    localStorage.setItem("username", username);
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

export async function sendQuiz(name, question) {
  const response = await fetch(`${BACKEND_URL}/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, question }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (response.status === 200) {
    localStorage.setItem("name", name);
  }
}
