import express from "express";
import {updateUserAchievements} from './../controllers/achievements.js'
const router = express.Router();

router.post("/update-ach",updateUserAchievements);


export default router;