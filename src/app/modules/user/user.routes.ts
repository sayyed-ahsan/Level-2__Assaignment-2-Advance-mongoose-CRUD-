import express from 'express';
import { UserController } from './user.controller';

const route = express.Router();
//-------------------------------- 50 marks
route.post('/', UserController.createUser);
route.get('/', UserController.allUsers);
route.get('/:userId', UserController.getSingleUsers);
route.put('/:userId', UserController.updateSingleUser);
route.delete('/:userId', UserController.deleteSingleUserById);
//-------------------------------- 10 marks
route.put('/:userId/orders', UserController.addOrders);
route.get('/:userId/orders', UserController.getAllOrders);
route.get('/:userId/orders/total-price', UserController.getTotalPriceOfOrders);

export const UserRoute = route;
