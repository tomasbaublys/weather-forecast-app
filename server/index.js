import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api', weatherRoutes);

app.listen(5500, () => {
  console.log('Server running on http://localhost:5500');
});