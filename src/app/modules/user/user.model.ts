import mongoose, { Schema } from 'mongoose';
import { UserInterface } from './user.interface';

// Define the Mongoose schema
const userSchema = new Schema<UserInterface>({
  userId: { type: Number, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

// Create the Mongoose model
const UserModel = mongoose.model<UserInterface>('User', userSchema);

export default UserModel;