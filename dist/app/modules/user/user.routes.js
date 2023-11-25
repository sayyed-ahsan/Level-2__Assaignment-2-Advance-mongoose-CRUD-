"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const route = express_1.default.Router();
//-------------------------------- 50 marks
route.post('/', user_controller_1.UserController.createUser);
route.get('/', user_controller_1.UserController.allUsers);
route.get('/:userId', user_controller_1.UserController.getSingleUsers);
route.put('/:userId', user_controller_1.UserController.updateSingleUser);
route.delete('/:userId', user_controller_1.UserController.deleteSingleUserById);
//-------------------------------- 10 marks
route.put('/:userId/orders', user_controller_1.UserController.addOrders); //done
route.get('/:userId/orders', user_controller_1.UserController.getAllOrders); //done
route.get('/:userId/orders/total-price', user_controller_1.UserController.getTotalPriceOfOrders); //done
exports.UserRoute = route;
