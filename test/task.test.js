require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const taskRoutes = require("../routes/taskRoutes");
const Task = require("../models/taskModel");
const Project = require("../models/projectModel");

jest.setTimeout(30000); // 30s timeout for Atlas connection

jest.mock("../middleware/auth", () => {
    return (req, res, next) => next(); // bypass auth
});


const app = express();
app.use(bodyParser.json());
app.use("/api/tasks", taskRoutes);

let projectId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // create a project for tasks
    const project = await Project.create({ name: "Test Project", owner: "Owner" });
    projectId = project._id.toString();
});

afterAll(async () => {
    await Task.deleteMany({});
    await Project.deleteMany({});
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Task.deleteMany({});
});

describe("Tasks API", () => {
    it("GET /api/tasks → should return 200 and an array", async () => {
        const res = await request(app).get("/api/tasks");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("POST /api/tasks → should create a task", async () => {
        const res = await request(app).post("/api/tasks").send({
            projectId,
            title: "Test Task",
            status: "todo",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("Test Task");
    });

    it("GET /api/tasks/:id → should return the task", async () => {
        const task = await Task.create({ projectId, title: "Sample Task" });
        const res = await request(app).get(`/api/tasks/${task._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(task._id.toString());
    });

    it("PUT /api/tasks/:id → should update the task", async () => {
        const task = await Task.create({ projectId, title: "Old Task" });
        const res = await request(app)
            .put(`/api/tasks/${task._id}`)
            .send({ title: "Updated Task" });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Updated Task");
    });

    it("DELETE /api/tasks/:id → should delete the task", async () => {
        const task = await Task.create({ projectId, title: "Delete Me" });
        const res = await request(app).delete(`/api/tasks/${task._id}`);
        expect(res.statusCode).toBe(200);
        const exists = await Task.findById(task._id);
        expect(exists).toBeNull();
    });
});
