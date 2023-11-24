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

export const StudentServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserById,
  deleteUserFromDB,
  updateUserInDB,
};
