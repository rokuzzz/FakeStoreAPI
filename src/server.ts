import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path';

//import swaggerDocument from './swagger/swagger.json'
const swaggerDocument = YAML.load(path.join(__dirname, '../_build/swagger.yaml'))

//initialize the express server
const app = express();

// Common middlewaresm
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add swagger router
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true
}));

// Set dynamic view from views dir
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static view from public dir
/* const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir)); */

// Serve index.html file
app.get('/', (_: Request, res: Response) => {
    res.sendFile('index.html', { root: viewsDir });
});

// Export here and start in a diff file (for testing).
export default app;
