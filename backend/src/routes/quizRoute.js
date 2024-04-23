import express from "express";

import * as quizController from "../controllers/quizController.js";

const router = express.Router();

router.get("/", quizController.getItems);
router.post("/", quizController.createItem);

export default router;