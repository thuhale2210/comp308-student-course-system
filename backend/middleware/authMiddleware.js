const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Not authorized, no token provided" });
        }

        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized, token invalid or expired" });
            }
            req.user = decoded; // Store decoded user data in request
            next(); // Proceed to next middleware
        });
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        res.status(401).json({ message: "Not authorized, token verification failed" });
    }
};

module.exports = protect;
