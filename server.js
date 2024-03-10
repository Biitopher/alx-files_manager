import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
