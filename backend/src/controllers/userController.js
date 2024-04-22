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

// export const getMembers = async (req, res) => {
//   // TODO4: implement this function
//   res.status(501).send("Unimplemented");
// };

// export const deleteMember = async (req, res) => {
//   // TODO4: implement this function
//   res.status(501).send("Unimplemented");
// };
