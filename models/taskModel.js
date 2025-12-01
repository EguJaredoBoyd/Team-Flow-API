const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - projectId
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         projectId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [todo, in-progress, done]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 64a1f2b3c1234567890abce
 *         title: "Create API"
 *         projectId: 64a1f2b3c1234567890abcd
 *         status: todo
 *         createdAt: 2025-11-30T12:34:56Z
 *         updatedAt: 2025-11-30T12:34:56Z
 */


const taskSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        title: { type: String, required: true },
        status: {
            type: String,
            enum: ["todo", "in-progress", "done"],
            default: "todo",
        },
        assignedTo: { type: String },
        dueDate: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
