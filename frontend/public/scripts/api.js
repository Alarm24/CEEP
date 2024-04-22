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
  return response.json(); // This returns the response body converted to JSON
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
  return response.json(); // This returns the response body converted to JSON, potentially including the authentication token
}

export async function checkLogin() {
  try {
    const response = await fetch(`${BACKEND_URL}/user/checkLogin`, {
      credentials: "include",
    });
    if (response.ok) {
      console.log("User is logged in.");
    } else {
      console.log("User is not logged in.");
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error("Failed to check login status:", error);
  }
}
window.checkLogin = checkLogin;
