import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Check for token in cookies
        if (!token) {
            return res.status(401).json({ message: '⚠️ Unauthorized' });
        }

        // Verify token and get user info
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: '⚠️ Unauthorized' });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: '⚠️ Unauthorized',
            error: error.message
        });
        next(error);
    }
}

export default authorize;