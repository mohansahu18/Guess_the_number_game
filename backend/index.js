
import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import authRoutes from "./routes/auth.js"
import scoreRoutes from "./routes/scores.js"
import DBConnection from "./config/Dbconnection.js";
const app = express();

app.use(cors());
app.use(express.json());

DBConnection()

app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});