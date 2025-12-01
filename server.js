// server.js
import "dotenv/config"; // automatically loads .env
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

// DATABASE & PASSPORT SETUP
import connectDB from "./config/database.js";
import "./passport-setup.js";

// ROUTES
import protectedRoutes from "./routes/protectedRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // <-- Added userRoutes
import errorHandler from "./middleware/errorHandler.js";

// SWAGGER
import swaggerDocs from "./swagger/swagger.js";

// INIT EXPRESS
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// DATABASE CONNECT
connectDB();

// SESSION + PASSPORT
app.use(
    session({
        secret: process.env.SESSION_SECRET || "session_secret",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes); // <-- Mount userRoutes for PUT & DELETE
// Root route
app.get("/", (req, res) => {
    const productionURL = process.env.PRODUCTION_URL || "http://localhost:8080";
    res.send(`TeamFlow API is running at ${productionURL}`);
});


// SWAGGER
swaggerDocs(app);

// ERROR HANDLER
app.use(errorHandler);

// START SERVER (skip during tests)
const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}/api-docs`));
}

export default app;
