import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        (err) => console.error('MongoDB connection error:', err)
    }
}
export default DBConnection