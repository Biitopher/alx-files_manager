import express from 'express';
import routes from './routes/index';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up routes
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
