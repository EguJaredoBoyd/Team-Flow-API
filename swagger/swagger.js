// swagger/swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TeamFlow API",
            version: "1.0.0",
            description: "TeamFlow Project Management API with Auth, Projects, Tasks, and Users.",
        },
        servers: [
            { url: "http://localhost:8080" }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },

    apis: ["./routes/*.js", "./models/*.js"], // Scans all route files
};

const swaggerSpec = swaggerJsDoc(options);

export default (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
