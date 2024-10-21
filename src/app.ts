import express, { Application } from 'express';
import routes from './routes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.path}`);
    next();
});

// Rutas
app.use('/api/v1', routes);

export default app;
