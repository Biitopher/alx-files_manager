import express from 'express';
import routes from './index';

const app = express();

// Load routes
app.use('/', routes);

export default app;