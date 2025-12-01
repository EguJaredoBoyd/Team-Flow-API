const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

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
 *         id:
 *           type: string
 *         projectId:
 *           type: string
 *         title:
 *           type: string
 *         status:
 *           type: string
 *           enum: [todo, in-progress, done]
 *       example:
 *         projectId: "67a95f08c9f8468be9aa0b55"
 *         title: "Design homepage UI"
 *         status: "todo"
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 *
 *   post:
 *     tags: [Tasks]
 *     summary: Create a task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created
 */

// REAL ROUTES
router.get("/", auth, taskController.getAllTasks);
router.post("/", auth, taskController.createTask);


/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     tags: [Tasks]
 *     summary: Get task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 *
 *   put:
 *     tags: [Tasks]
 *     summary: Update a task
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Task updated
 *
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete task
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: Task deleted
 */

// REAL ROUTES
router.get("/:id", auth, taskController.getTaskById);
router.put("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
