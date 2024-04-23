import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  name: String,
  question: [{
    name: String,
    choices: [String],
    answer: Number
  }]
});

const Item = mongoose.model("Quiz", quizSchema);

export default Item;
