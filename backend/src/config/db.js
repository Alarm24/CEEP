import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017/sessions";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
