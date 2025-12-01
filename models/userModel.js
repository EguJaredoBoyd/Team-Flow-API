const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ID
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         provider:
 *           type: string
 *         googleId:
 *           type: string
 *       example:
 *         _id: 64a1f2b3c1234567890abcd
 *         name: Augustine
 *         email: augustine@example.com
 *         password: hashedpassword
 *         provider: local
 *         googleId: null
 */


const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String }, // present for local accounts
    provider: { type: String, default: "local" }, // 'local' or 'google'
    googleId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
