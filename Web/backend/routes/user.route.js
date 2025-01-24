import express from "express";
import { getPoints, updatePoints } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router();

router.get("/getPoints",protectRoute,getPoints);
router.patch("/updatePoints",protectRoute, updatePoints);
export default router;