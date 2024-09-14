import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const authenticateToken = (req, res, next) => {
    const authHeader = req?.headers['authorization'] && req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isValid = jwt.verify(token, process.env.JWT_SECRET)
    if (isValid) {
        req.user = isValid;
        next();
    } else {
        return res.status(403).json({ message: 'Invalid credentials' });

    }
};
export default authenticateToken