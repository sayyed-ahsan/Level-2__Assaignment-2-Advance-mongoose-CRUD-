import { UserInterface } from './user.interface';
import UserModel from './user.model';
//---------------

const createUserIntoDB = async (user: UserInterface) => {
  const result = await UserModel.create(user);
  return result;
};

//---------------

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

//---------------

const getSingleUserById = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

//---------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUserInDB = async (userId: string, updatedData: any) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  });

  return result;
};

//---------------

const deleteUserFromDB = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  console.log(`sssss--- ${result}`);
  return result;
};

//---------------
//---------------
//---------------
//---------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addOrdersDB = async (userId: string, newOrder: any) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: newOrder } },
    { upsert: true, new: true },
  );
  return result;
};
//---------------
const getAllOrdersByID = async (userId: string) => {
  const result = await UserModel.findOne({ userId }, { orders: 1, _id: 0 });
  return result;
};
//---------------
const getTotalOfOrdersByID = async (userId: string) => {
  const result = await UserModel.aggregate([
    { $match: { userId: parseInt(userId) } }, // Match the user by userId
    { $unwind: '$orders' }, // Deconstruct the 'orders' array
    {
      $group: {
        _id: null,
        total: { $sum: '$orders.price' }, // Calculate the sum of 'price' in 'orders'
      },
    },
  ]);

  if (result.length > 0) {
    return result[0].total;
  } else {
    // User not found
    return 0;
  }
};
//---------------

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserById,
  deleteUserFromDB,
  updateUserInDB,
  addOrdersDB,
  getAllOrdersByID,
  getTotalOfOrdersByID,
};
