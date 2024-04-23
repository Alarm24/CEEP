import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/update_score", userController.updateScore);
router.get("/", userController.getUsers);

export default router;
