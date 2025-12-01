const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { signToken } = require("../utils/jwt");

// Local register (optional, useful even with OAuth)
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password required" });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hash, provider: "local" });

        const token = signToken({ id: user._id });
        res.status(201).json({ user: { id: user._id, email: user.email, name: user.name }, token });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        const token = signToken({ id: user._id });
        res.json({ user: { id: user._id, email: user.email, name: user.name }, token });
    } catch (err) {
        next(err);
    }
};
