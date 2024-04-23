import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/checkLogin", userController.checkLoginStatus);
router.post("/logout", userController.logoutUser);

export default router;
