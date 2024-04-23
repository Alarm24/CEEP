import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

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
      _id: user._id,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal server error.");
  }
};

export const updateScore = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    const scoreUpdates = {};
    for (const key in req.body.scores) {
      scoreUpdates[`scores.${key}`] = req.body.scores[key];
    }

    const updateResult = await User.updateOne(
      { username: req.body.username },
      { $set: scoreUpdates }
    );

    if (updateResult.nModified === 0) {
      return res.status(404).send("No user was updated.");
    }
    return res.status(200).json({
      message: "Update Success",
    });
  } catch (error) {
    console.error("Error updating user score:", error);
    res.status(500).send("Internal server error.");
  }
};
