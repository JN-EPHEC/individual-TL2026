import express, { type Request, type Response } from 'express';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import { requestLogger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();
const port = 3000;

// 1. Réglages de base
app.use(express.json()); 
app.use(express.static('public'));

// 2. Le Logger en premier (pour tout voir)
app.use(requestLogger);

// 3. Swagger juste après (la doc)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 4. Tes routes
app.use('/api/users', userRoutes);

// ex 6.2
app.get('/api/hello/:name', (req, res) => {
    const name: string = req.params.name;
    const now: string = new Date().toISOString();
    res.json({ message: `Bonjour ${name}`, timestamp: now });
});

// 5. Les Erreurs 
app.use(errorHandler);

// --- La Base de données et le Serveur ---
sequelize.authenticate()
    .then(() => console.log('Connexion à la base de données SQLite réussie !'))
    .catch((err) => console.error('Impossible se connecter :', err));

sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('Base de données synchronisée !');
        app.listen(port, () => {
            console.log(`Serveur lancé sur http://localhost:${port}`);
        });
    })
    .catch((err) => console.error('Erreur de synchronisation DB :', err));

function greet(name: string): string {
    return name + " est le boat"
}
console.log(greet("Théo"));