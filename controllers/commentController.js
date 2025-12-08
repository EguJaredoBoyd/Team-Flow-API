import Comment from "../models/commentModel.js";

// GET all comments
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET comment by ID
export const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE comment
export const createComment = async (req, res) => {
    try {
        const { text, taskId, projectId } = req.body;

        // Validation
        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "Text is required" });
        }

        const comment = await Comment.create({
            text,
            userId: req.user.id, // From auth middleware
            projectId: projectId || null,
            taskId: taskId || null
        });

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE comment
export const updateComment = async (req, res) => {
    try {
        const { text } = req.body;

        // Validation
        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "Text cannot be empty" });
        }

        const updated = await Comment.findByIdAndUpdate(
            req.params.id,
            { text },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE comment
export const deleteComment = async (req, res) => {
    try {
        const deleted = await Comment.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
