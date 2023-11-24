import express from 'express';
import { UserController } from './user.controller';

const route = express.Router();

route.post('/', UserController.createUser); //done
route.get('/', UserController.allUsers); //done
route.get('/:userId', UserController.getSingleUsers); //done
route.put('/:userId', UserController.updateSingleUser); //done
route.delete('/:userId', UserController.deleteSingleUserById); //done
//--------------------------------
route.put('/:userId/orders', UserController.addOrders); //done
route.get('/:userId/orders', UserController.getAllOrders); //done
route.get('/:userId/orders/total-price', UserController.getTotalPriceOfOrders); //done

export const UserRoute = route;
