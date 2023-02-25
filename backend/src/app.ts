import express, { Express } from 'express';
import cor from 'cors';
import todoRoutes from './routes/todoRoutes';

const app: Express = express();
app.use(cor());
app.use(express.json());


app.use('/api/v1/todos', todoRoutes);

export default app;

