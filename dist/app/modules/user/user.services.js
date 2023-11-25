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
exports.userServices = void 0;
const user_model_1 = __importDefault(require("./user.model"));
//---------------
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(user);
    return result;
});
//---------------
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
//---------------
const getSingleUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ userId });
    return result;
});
//---------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUserInDB = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOneAndUpdate({ userId }, updatedData, {
        new: true,
    });
    return result;
});
//---------------
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.deleteOne({ userId });
    console.log(`sssss--- ${result}`);
    return result;
});
//---------------
//---------------
//---------------
//---------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addOrdersDB = (userId, newOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOneAndUpdate({ userId }, { $push: { orders: newOrder } }, { upsert: true, new: true });
    return result;
});
//---------------
const getAllOrdersByID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ userId }, { orders: 1, _id: 0 });
    return result;
});
//---------------
const getTotalOfOrdersByID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.aggregate([
        { $match: { userId: parseInt(userId) } },
        { $unwind: '$orders' },
        {
            $group: {
                _id: null,
                total: { $sum: '$orders.price' }, // Calculate the sum of 'price' in 'orders'
            },
        },
    ]);
    if (result.length > 0) {
        return result[0].total;
    }
    else {
        // User not found
        return 0;
    }
});
//---------------
exports.userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserById,
    deleteUserFromDB,
    updateUserInDB,
    addOrdersDB,
    getAllOrdersByID,
    getTotalOfOrdersByID,
};
