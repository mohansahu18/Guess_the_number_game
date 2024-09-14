import Score from "../models/Score.js";
import User from "../models/User.js";

export const saveScore = async (req, res) => {
    try {
        const { score } = req.body;
        const userId = req.user.userId;
        let scoreDoc = await Score.findOne({ user: userId });
        if (scoreDoc) {
            scoreDoc.scores.push({ score });
            if (score > scoreDoc.highScore) {
                scoreDoc.highScore = score;
            }
            await scoreDoc.save();
        } else {
            const newScoreDoc = new Score({
                user: userId,
                scores: [{ score }]
            });
            await newScoreDoc.save();
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (score > user.highScore) {
            user.highScore = score;
            await user.save();
        }
        res.status(201).json({ message: 'Score saved successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error saving score' });
    }
}

export const leaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find().sort({ highScore: -1 }).limit(10).select('username highScore');
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard' });
    }
}

