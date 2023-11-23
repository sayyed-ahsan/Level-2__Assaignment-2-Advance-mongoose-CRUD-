import express, { Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './app/modules/user/user.routes';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.send(`hello`);
});

export default app;
