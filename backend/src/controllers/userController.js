import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).send("User already exists.");
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    await newUser.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user.");
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    if (req.body.password !== user.password) {
      return res.status(401).send("Invalid credentials.");
    }
    req.session.isAuth = true;
    return res.status(200).json({ message: "Logged in successfully." });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal server error.");
  }
};

export const checkLoginStatus = (req, res) => {
  if (req.session.isAuth) {
    res.status(200).json({ message: "User is logged in." });
  } else {
    res.status(401).json({ message: "User is not logged in." });
  }
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
      return res.status(500).send("Failed to log out.");
    }
    res.send("Logged out successfully.");
  });
};
