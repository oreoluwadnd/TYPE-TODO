import express, { Express } from 'express';

import cor from 'cors';
const app: Express = express();



app.use(cor());




export default app;

