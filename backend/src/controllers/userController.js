import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).send("User already exists.");
    }

    const newUser = new User(req.body);
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
    return res.status(200).json({
      message: "Logged in successfully.",
      username: user.username, // Include the username in the response
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal server error.");
  }
};

export const updateScore = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    user.scores = req.body.scores;
    User.updateOne({ _id: req.body._id }, user, (err) => {
      if (err) {
        return res.status(500).send("Internal server error.");
      }
    })
    return res.status(200).json({
      message: "Update Success",
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal server error.");
  }
};