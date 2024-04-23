import express from "express";
import cors from "cors";
import UserRoute from "./routes/userRoute.js";
import QuizRoute from "./routes/quizRoute.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));


const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(
  cors({
    origin: "http://localhost:3221", // Specify the exact URL of the frontend
  })
);

app.get("/", (req, res) => {});

// use routes
app.use("/user", UserRoute);
app.use("/quiz", QuizRoute);

export default app;