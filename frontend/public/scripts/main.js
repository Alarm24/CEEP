import { createUser, loginUser, checkLoginStatus } from "./api.js";

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signupForm");
  signUpForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = document.getElementById("signupForm");
    const username = form.elements["username"].value;
    const password = form.elements["password"].value;
    try {
      const response = await createUser(username, password); // Capture the response
      console.log("User created:", response);
      window.location.href = "login.html"; // Redirect to login on success
    } catch (error) {
      console.error("Signup failed:", error);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = document.getElementById("loginForm");
    const username = form.elements["username"].value;
    const password = form.elements["password"].value;
    try {
      const response = await loginUser(username, password);
      console.log("Login successful:", response);
      // Save the token to localStorage/sessionStorage or set cookies as needed
      // Redirect to a different page or update the UI to show logged-in state
      window.location.href = "main.html"; // Example redirect on successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  });
});
