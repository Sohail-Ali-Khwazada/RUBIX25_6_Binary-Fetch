import express from "express";
import { addMessage, getMessages } from "../controllers/community.controller.js";

const router = express.Router();

router.get("/get-messages", getMessages);
router.post("/add-message", addMessage);

export default router;