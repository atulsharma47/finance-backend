const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ message: "No token provided" });
            }

            // remove "Bearer "
            const cleanToken = token.split(" ")[1];

            const decoded = jwt.verify(cleanToken, "secretkey");

            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // attach user
            req.user = user;

            // role check
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: "Access denied" });
            }

            next();

        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    };
};

module.exports = auth;