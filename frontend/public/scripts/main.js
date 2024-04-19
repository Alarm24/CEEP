import { createUser } from "./api.js"; // Adjust path if necessary

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signupForm");
  signUpForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = document.getElementById("signupForm");
    const username = form.elements["username"].value;
    const password = form.elements["password"].value;
    try {
      await createUser(username, password);
      console.log("User created:", response);
      window.location.href = "login.html"; // Redirect to login on success
    } catch (error) {
      console.error("Signup failed:", error);
    }
  });
});
