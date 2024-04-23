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
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json(); // This returns the response body converted to JSON, potentially including the authentication token
}

export async function checkLoginStatus() {
  const response = await fetch(`${BACKEND_URL}/user/checkLogin`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json(); // This returns the response body converted to JSON
}

export async function logoutUser() {
  const response = await fetch(`${BACKEND_URL}/user/logout`, {
    method: "POST",
    credentials: "include", // Necessary to include the session cookie in the request
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.text(); // This returns the response body as text
}
