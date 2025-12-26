import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Finance API",
            version: "1.0.0",
            description: "All API documentation in one file",
        },
        servers: [
            {
                url: "http://localhost:3001",
            },
        ],
    },

    apis: ["./swagger.docs.js"],
});

export default swaggerSpec;
