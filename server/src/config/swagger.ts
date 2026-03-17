import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mon API Géniale",
      version: "1.0.0",
    },
    paths: {
      "/api/users": {
        get: {
          summary: "Récupère la liste des utilisateurs",
          responses: {
            200: { description: "Succès" }
          }
        }
      }
    }
  },
  apis: [], // On laisse vide pour éviter le crash !
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);