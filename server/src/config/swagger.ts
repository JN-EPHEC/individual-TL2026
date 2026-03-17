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
        },
        post: {
          summary: "Ajouter un utilisateur",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    nom: { type: "string" },
                    prenom: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: "Utilisateur créé" }
          }
        }
      }
    }
  },
  apis: [], 
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);