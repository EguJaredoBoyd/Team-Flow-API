const Project = require("../models/projectModel"); // your file name
const Task = require("../models/taskModel");

// GET /api/projects
exports.getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        next(err);
    }
};

// GET /api/projects/:id
exports.getProjectById = async (req, res, next) => {
    try {
        const p = await Project.findById(req.params.id);
        if (!p) return res.status(404).json({ message: "Project not found" });
        res.json(p);
    } catch (err) {
        next(err);
    }
};

// POST /api/projects
exports.createProject = async (req, res, next) => {
    try {
        const { name, description, owner, teamMembers } = req.body;
        if (!name) return res.status(400).json({ message: "Name is required" });

        const project = await Project.create({ name, description, owner, teamMembers });
        res.status(201).json(project);
    } catch (err) {
        next(err);
    }
};

// PUT /api/projects/:id
exports.updateProject = async (req, res, next) => {
    try {
        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Project not found" });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/projects/:id
exports.deleteProject = async (req, res, next) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Project not found" });

        await Task.deleteMany({ projectId: deleted._id });
        res.json({ message: "Project and tasks deleted" });
    } catch (err) {
        next(err);
    }
};
