"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const route = express_1.default.Router();
route.post('/', user_controller_1.UserController.createUser); //done
route.get('/', user_controller_1.UserController.allUsers); //done
route.get('/:userId', user_controller_1.UserController.getSingleUsers); //done
route.put('/:userId', user_controller_1.UserController.updateSingleUser); //done
route.delete('/:userId', user_controller_1.UserController.deleteSingleUserById); //done
//--------------------------------
route.put('/:userId/orders', user_controller_1.UserController.addOrders); //done
route.get('/:userId/orders', user_controller_1.UserController.getAllOrders); //done
route.get('/:userId/orders/total-price', user_controller_1.UserController.getTotalPriceOfOrders); //done
exports.UserRoute = route;
