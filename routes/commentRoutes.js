// routes/commentRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         id:
 *           type: string
 *         text:
 *           type: string
 *         userId:
 *           type: string
 *         projectId:
 *           type: string
 *         taskId:
 *           type: string
 *       example:
 *         text: "This is a comment"
 *         userId: "userIdHere"
 *         projectId: "projectIdHere"
 *         taskId: "taskIdHere"
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Get all comments
 *     responses:
 *       200:
 *         description: List of comments
 *
 *   post:
 *     tags: [Comments]
 *     summary: Create a comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     tags: [Comments]
 *     summary: Get comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment found
 *
 *   put:
 *     tags: [Comments]
 *     summary: Update a comment
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *             example:
 *               text: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */

// ROUTES
router.get("/", auth, getComments);
router.get("/:id", auth, getCommentById);
router.post("/", auth, createComment);
router.put("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment);

export default router;
