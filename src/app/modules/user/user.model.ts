import mongoose, { Schema } from 'mongoose';
import { UserInterface } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// user schema

const userSchema = new Schema<UserInterface>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
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
  orders: {
    type: [
      {
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    default: undefined,
  },
});

// this pre function will encode the password by the help of bcrypt

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// this will not sed the password in result data

userSchema.post('save', function (doc, next) {
  doc.password = undefined as unknown as string;
  next();
});

// User Model

const UserModel = mongoose.model<UserInterface>('User', userSchema);

export default UserModel;
