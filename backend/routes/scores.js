import express from "express"
import { leaderboard, saveScore } from "../controller/scores.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();


router.post('/', authenticateToken, saveScore);

router.get('/leaderboard', leaderboard);

export default router;