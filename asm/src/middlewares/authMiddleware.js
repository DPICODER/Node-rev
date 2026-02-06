const jwt = require("jsonwebtoken");
const User = require("../models/User");


/**
 * PROTECT MIDDLEWARE — JWT Authentication Guard
 *
 * Flow:
 * 1. Check Authorization header exists
 * 2. Expect format: "Bearer <token>"
 * 3. Extract token from header
 * 4. Reject request if token missing
 * 5. Verify token using JWT_SECRET
 * 6. Decode user ID from token
 * 7. Fetch user from database
 * 8. Attach sanitized user to req.user
 * 9. Call next() to continue request
 *
 * Failure cases → return 401:
 * - No token
 * - Invalid token
 * - Expired token
 * - User not found
 *
 * Purpose:
 * Ensures only authenticated users can access protected routes.
 */


/**
 * Authentication middleware
 *
 * Extracts JWT from Authorization header (Bearer token),
 * verifies it using the server secret, and attaches the
 * authenticated user to req.user.
 *
 * Blocks access with 401 if token is missing, invalid,
 * expired, or the user no longer exists.
 */


const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "No token, Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT ERROR  :", error.message);

        return res.status(401).json({ message: "token invalid or expired" });
    }
};

module.exports = protect;
