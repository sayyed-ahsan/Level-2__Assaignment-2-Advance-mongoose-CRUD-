"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const UserValidationSchema = zod_1.default.object({
    userId: zod_1.default.number().int().positive(),
    username: zod_1.default.string().min(3).max(50),
    password: zod_1.default.string().min(6).max(50),
    fullName: zod_1.default.object({
        firstName: zod_1.default
            .string()
            .min(1)
            .max(20)
            .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
        lastName: zod_1.default.string().min(1).max(50),
    }),
    age: zod_1.default.number().int().positive(),
    email: zod_1.default.string().email(),
    isActive: zod_1.default.boolean(),
    hobbies: zod_1.default.array(zod_1.default.string()),
    address: zod_1.default.object({
        street: zod_1.default.string().min(1).max(100),
        city: zod_1.default.string().min(1).max(50),
        country: zod_1.default.string().min(1).max(50),
    }),
    orders: zod_1.default
        .array(zod_1.default.object({
        productName: zod_1.default.string(),
        price: zod_1.default.number().positive(),
        quantity: zod_1.default.number().int().positive(),
    }))
        .optional(),
});
exports.default = UserValidationSchema;
