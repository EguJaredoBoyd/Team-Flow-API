const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const oauthController = require("../controllers/oauthController");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input or user already exists
 */


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Augustine
 *               email:
 *                 type: string
 *                 example: augustine@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: augustine@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass123
 *     responses:
 *       200:
 *         description: JWT token returned
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/google:
 *   get:
 *     tags: [Auth]
 *     summary: Redirect to Google OAuth
 *     responses:
 *       302:
 *         description: Redirects to Google login
 */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Google OAuth callback handler
 *     responses:
 *       200:
 *         description: OAuth login successful
 *       401:
 *         description: OAuth login failed
 */
router.get(
    "/google/callback",
    passport.authenticate("google", { session: true, failureRedirect: "/auth/failure" }),
    oauthController.googleCallback
);

/**
 * @swagger
 * /auth/failure:
 *   get:
 *     tags: [Auth]
 *     summary: Authentication failed
 *     responses:
 *       401:
 *         description: Auth failed
 */
router.get("/failure", (req, res) => res.status(401).json({ message: "Auth failed" }));

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags: [Auth]
 *     summary: Logout user and clear session
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.get("/logout", (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.json({ message: "Logged out successfully" });
        });
    });
});

module.exports = router;
