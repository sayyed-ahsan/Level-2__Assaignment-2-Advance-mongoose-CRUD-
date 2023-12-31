import express, { Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './app/modules/user/user.routes';
const app = express();

app.use(express.json());
app.use(cors());

// this is the User route
app.use('/api/users', UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.send(`Welcome... Hope you are well today`);
});

export default app;
