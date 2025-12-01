const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - owner
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         name:
 *           type: string
 *         owner:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 64a1f2b3c1234567890abcd
 *         name: Team Project
 *         owner: Augustine
 *         description: First project
 *         createdAt: 2025-11-30T12:34:56Z
 *         updatedAt: 2025-11-30T12:34:56Z
 */


const projectSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        owner: { type: String, required: true }, // user who created it
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
