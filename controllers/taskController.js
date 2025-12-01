const Task = require("../models/taskModel");
const Project = require("../models/projectModel");

// GET /api/tasks
exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

// GET /api/tasks/:id
exports.getTaskById = async (req, res, next) => {
    try {
        const t = await Task.findById(req.params.id);
        if (!t) return res.status(404).json({ message: "Task not found" });
        res.json(t);
    } catch (err) {
        next(err);
    }
};

// POST /api/tasks
exports.createTask = async (req, res, next) => {
    try {
        const { title, description, projectId, assignedTo, status, dueDate, priority } = req.body;
        if (!title || !projectId) return res.status(400).json({ message: "Title and projectId required" });

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        const task = await Task.create({ title, description, projectId, assignedTo, status, dueDate, priority });
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
    try {
        const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Task not found" });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        next(err);
    }
};
