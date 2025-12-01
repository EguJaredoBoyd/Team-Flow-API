require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const projectRoutes = require("../routes/projectRoutes");
const Project = require("../models/projectModel");

jest.setTimeout(30000); // 30s timeout for Atlas connection

jest.mock("../middleware/auth", () => {
    return (req, res, next) => next();
});


const app = express();
app.use(bodyParser.json());
app.use("/api/projects", projectRoutes);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    // Clear collection before each test
    await Project.deleteMany({});
});

describe("Projects API", () => {
    it("GET /api/projects → should return 200 and an array", async () => {
        const res = await request(app).get("/api/projects");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("POST /api/projects → should create a project", async () => {
        const res = await request(app).post("/api/projects").send({
            name: "Test Project",
            description: "Test description",
            owner: "Test Owner",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Test Project");
    });

    it("GET /api/projects/:id → should return the project", async () => {
        const project = await Project.create({
            name: "Sample Project",
            owner: "Owner",
        });
        const res = await request(app).get(`/api/projects/${project._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(project._id.toString());
    });

    it("PUT /api/projects/:id → should update the project", async () => {
        const project = await Project.create({ name: "Old Name", owner: "Owner" });
        const res = await request(app)
            .put(`/api/projects/${project._id}`)
            .send({ name: "Updated Name" });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Updated Name");
    });

    it("DELETE /api/projects/:id → should delete the project", async () => {
        const project = await Project.create({ name: "Delete Me", owner: "Owner" });
        const res = await request(app).delete(`/api/projects/${project._id}`);
        expect(res.statusCode).toBe(200);
        const exists = await Project.findById(project._id);
        expect(exists).toBeNull();
    });
});
