import express from "express";

import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getMembers);
router.post("/", userController.createMember);
router.delete("/:id", userController.deleteMember);

export default router;
