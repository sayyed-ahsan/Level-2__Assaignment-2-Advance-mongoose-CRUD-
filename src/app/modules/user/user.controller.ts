import { Request, Response } from 'express';
import { NextFunction } from 'express';
import { StudentServices } from './user.services';
import UserValidationSchema from './user.zodValidation';

//---------------

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    // Zod
    const zodParseData = UserValidationSchema.parse(user);
    const data = await StudentServices.createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Successfully Created',
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not Created !!!',
      error: {
        code: 404,
        description: 'User not Created because of some problem',
        error: error,
      },
    });
    console.log(error);
    next(error);
  }
};

//---------------

const allUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await StudentServices.getAllUsersFromDB();

    if (data.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Successfully Get All users',
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Users not Found !!!',
        error: {
          code: 404,
          description: 'No users found in the database',
        },
      });
    }
  } catch (error) {
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
};

//---------------

const getSingleUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await StudentServices.getSingleUserById(req.params.userId);

    if (data) {
      res.status(200).json({
        success: true,
        message: 'Successfully Got this user',
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not Found !!!',
        error: {
          code: 404,
          description: 'User not Found because of some problem',
        },
      });
    }
  } catch (error) {
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
};
//---------------

const updateSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;

    const zodParseUpdateData = UserValidationSchema.parse(updatedData);

    const existingUser = await StudentServices.getSingleUserById(userId);

    if (existingUser) {
      const updatedUser = await StudentServices.updateUserInDB(
        userId,
        zodParseUpdateData,
      );

      res.status(200).json({
        success: true,
        message: 'Successfully Updated this user',
        data: updatedUser,
      });
    } else {
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
  } catch (error) {
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
};

//---------------

const deleteSingleUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await StudentServices.deleteUserFromDB(req.params.userId);

    if (data && data.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Successfully Deleted this user',
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not Found !!!',
        error: {
          code: 404,
          description: 'User not Found because of some problem',
        },
      });
    }
  } catch (error) {
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
};

//---------------

export const UserController = {
  createUser,
  allUsers,
  getSingleUsers,
  deleteSingleUserById,
  updateSingleUser,
};
