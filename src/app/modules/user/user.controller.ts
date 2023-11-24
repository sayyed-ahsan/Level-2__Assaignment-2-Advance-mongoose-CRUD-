import { Request, Response } from 'express';
import { NextFunction } from 'express';
import { StudentServices } from './user.services';
import UserValidationSchema from './user.zodValidation';

//---------------

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user;
    const zodParseData = UserValidationSchema.parse(user);
    const data = await StudentServices.createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Successfully Created',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

//---------------

const allUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await StudentServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Successfully Get All users',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

//---------------

const getSingleUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await StudentServices.getSingleUserById(req.params.userId);
    console.log(req.params.userId);

    res.status(200).json({
      success: true,
      message: 'Successfully Got this user',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

//---------------

const deleteSingleUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await StudentServices.deleteUserFromDB(req.params.userId);
    res.status(200).json({
      success: true,
      message: `Successfully deleted ${data}`,
      data: data ? 'not deleted' : null,
    });
  } catch (error) {
    next(error);
  }
};

//---------------

export const UserController = {
  createUser,
  allUsers,
  getSingleUsers,
  deleteSingleUserById,
};
