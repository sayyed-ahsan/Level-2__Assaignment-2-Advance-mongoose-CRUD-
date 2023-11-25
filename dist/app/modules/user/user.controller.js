"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_services_1 = require("./user.services");
const user_zodValidation_1 = __importDefault(require("./user.zodValidation"));
// import UserModel from './user.model';
//---------------
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        // Zod
        const zodParseData = user_zodValidation_1.default.parse(user);
        const data = yield user_services_1.userServices.createUserIntoDB(zodParseData);
        res.status(200).json({
            success: true,
            message: 'Successfully Created',
            data: data,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'User not Created !!!',
            error: {
                code: 404,
                description: 'User not Created because of some problem',
                error: error,
            },
        });
        console.log(error);
        next(error);
    }
});
//---------------
const allUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_services_1.userServices.getAllUsersFromDB();
        if (data.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Successfully Get All users',
                data: data,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Users not Found !!!',
                error: {
                    code: 404,
                    description: 'No users found in the database',
                },
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Users not Found !!!',
            error: {
                code: 404,
                description: 'Users not Found because of some problem',
                error: error,
            },
        });
        console.log(error);
        next(error);
    }
});
//---------------
const getSingleUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_services_1.userServices.getSingleUserById(req.params.userId);
        if (data) {
            res.status(200).json({
                success: true,
                message: 'Successfully Got this user',
                data: data,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not Found !!!',
                error: {
                    code: 404,
                    description: 'User not Found because of some problem',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: {
                code: 500,
                description: 'An error occurred while processing the request',
                error: error,
            },
        });
        console.log(error);
        next(error);
    }
});
//---------------
const updateSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        const zodParseUpdateData = user_zodValidation_1.default.parse(updatedData);
        const existingUser = yield user_services_1.userServices.getSingleUserById(userId);
        if (existingUser) {
            const updatedUser = yield user_services_1.userServices.updateUserInDB(userId, zodParseUpdateData);
            res.status(200).json({
                success: true,
                message: 'Successfully Updated this user',
                data: updatedUser,
            });
        }
        else {
            // User not found, return a 404 response
            res.status(404).json({
                success: false,
                message: 'User not Found !!!',
                error: {
                    code: 404,
                    description: 'User not Found because of some problem',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: {
                code: 500,
                description: 'An error occurred while processing the request',
                error: error,
            },
        });
        console.log(error);
        next(error);
    }
});
//---------------
const deleteSingleUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_services_1.userServices.deleteUserFromDB(req.params.userId);
        if (data && data.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: 'Successfully Deleted this user',
                data: data,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not Found !!!',
                error: {
                    code: 404,
                    description: 'User not Found because of some problem',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: {
                code: 500,
                description: 'An error occurred while processing the request',
                error: error,
            },
        });
        next(error);
    }
});
//---------------
//---------------
//---------------
//---------------
const addOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;
        // const zodParseUpdateData = UserValidationSchema.parse(updatedData);
        const existingUser = yield user_services_1.userServices.getSingleUserById(userId);
        if (existingUser) {
            const addOrder = yield user_services_1.userServices.addOrdersDB(userId, updatedData);
            const newOrders = addOrder === null || addOrder === void 0 ? void 0 : addOrder.orders;
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: {
                    orders: newOrders,
                },
            });
        }
        else {
            // User not found, return a 404 response
            res.status(404).json({
                success: false,
                message: 'User not Found !!!',
                error: {
                    code: 404,
                    description: 'User not Found because of some problem',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: {
                code: 500,
                description: 'An error occurred while processing the request',
                error: error,
            },
        });
        console.log(error);
        next(error);
    }
});
//---------------
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const existingUser = yield user_services_1.userServices.getSingleUserById(userId);
        if (existingUser) {
            const allOrders = yield user_services_1.userServices.getAllOrdersByID(userId);
            const ordersData = allOrders === null || allOrders === void 0 ? void 0 : allOrders.orders;
            if (ordersData) {
                res.status(200).json({
                    success: true,
                    message: 'Got all Orders successfully!',
                    data: {
                        orders: ordersData,
                    },
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'User exist but Orders not Found !!!',
                    error: {
                        code: 404,
                        description: 'Orders not Found !!!',
                    },
                });
            }
        }
        else {
            // User not found, return a 404 response
            res.status(404).json({
                success: false,
                message: 'User not Found !!!',
                error: {
                    code: 404,
                    description: 'User not Found because of some problem',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: {
                code: 500,
                description: 'An error occurred while processing the request',
                error: error,
            },
        });
        next(error);
    }
});
//---------------
const getTotalPriceOfOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const existingUser = yield user_services_1.userServices.getSingleUserById(userId);
        if (existingUser) {
            const total = yield user_services_1.userServices.getTotalOfOrdersByID(userId);
            console.log('Total Price:', total);
            console.log(total);
            res.status(200).json({
                success: true,
                message: 'Got all Orders Total successfully!',
                totalPrice: total,
            });
        }
        else {
            // User not found, return a 404 response
            res.status(404).json({
                success: false,
                message: 'User not Found !!!',
                error: {
                    code: 404,
                    description: 'User not Found because of some problem',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: {
                code: 500,
                description: 'An error occurred while processing the request',
                error: error,
            },
        });
        console.log(error);
        next(error);
    }
});
//---------------
exports.UserController = {
    createUser,
    allUsers,
    getSingleUsers,
    deleteSingleUserById,
    updateSingleUser,
    addOrders,
    getAllOrders,
    getTotalPriceOfOrders,
};
