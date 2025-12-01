const jwtUtils = require("../utils/jwt");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

        const payload = jwtUtils.verifyToken(token);
        if (!payload || !payload.id) return res.status(401).json({ message: "Unauthorized" });

        // attach user minimal info to request
        const user = await User.findById(payload.id).select("-password");
        if (!user) return res.status(401).json({ message: "Unauthorized: user not found" });

        req.user = { id: user._id, email: user.email, name: user.name };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: invalid token", error: err.message });
    }
};
