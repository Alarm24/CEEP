import express from "express";

import * as quizController from "../controllers/quizController.js";

const router = express.Router();

router.get("/", quizController.getItems);
router.post("/", quizController.createItem);
router.delete("/:id", quizController.deleteItem);
// TODO3: add a router for the filter function

export default router;
