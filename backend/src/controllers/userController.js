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
    // Here you would handle creating a session or generating a token
    // For example, using a JSON Web Token (JWT)
    // const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    // res.json({ message: "Logged in successfully", token });
    return res.status(200).json({ message: "Logged in successfully." });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal server error.");
  }
};
