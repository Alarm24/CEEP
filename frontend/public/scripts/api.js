import { BACKEND_URL } from "./config.js";

export async function createUser(username, password) {
  await fetch(`${BACKEND_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
}
