import express from 'express';
import { UserController } from './user.controller';

const route = express.Router();

route.post('/', UserController.createUser);
route.get('/', UserController.allUsers);
route.get('/:userId', UserController.getSingleUsers);
route.delete('/:userId', UserController.deleteSingleUserById);

export const UserRoute = route;
