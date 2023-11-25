import { Request, Response } from 'express';
import { NextFunction } from 'express';
import { userServices } from './user.services';
import UserValidationSchema from './user.zodValidation';

//--------------- it will create a user

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    // Zod
    const zodParseData = UserValidationSchema.parse(user);
    const data = await userServices.createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Successfully Created',
      data: data,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not Created !!!',
      error: {
        code: 404,
        description: 'User not Created because of some problem',
        error: error,
      },
    });
    next(error);
  }
};

//--------------- it will find all users

const allUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userServices.getAllUsersFromDB();

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
    next(error);
  }
};

//--------------- function for searching user by Id

const getSingleUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await userServices.getSingleUserById(req.params.userId);

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
    next(error);
  }
};
//--------------- update user by Id

const updateSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;

    const zodParseUpdateData = UserValidationSchema.parse(updatedData);

    const existingUser = await userServices.getSingleUserById(userId);

    if (existingUser) {
      const updatedUser = await userServices.updateUserInDB(
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
    next(error);
  }
};

//--------------- deleting user by Id

const deleteSingleUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await userServices.deleteUserFromDB(req.params.userId);

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
// Extra 10 marks
//---------------

const addOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;

    const existingUser = await userServices.getSingleUserById(userId);

    if (existingUser) {
      const addOrder = await userServices.addOrdersDB(userId, updatedData);

      // const newOrders = addOrder?.orders;
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: addOrder,
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
const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;

    const existingUser = await userServices.getSingleUserById(userId);

    if (existingUser) {
      const allOrders = await userServices.getAllOrdersByID(userId);

      const ordersData = allOrders?.orders;
      if (ordersData) {
        res.status(200).json({
          success: true,
          message: 'Got all Orders successfully!',
          data: {
            orders: ordersData,
          },
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User exist but Orders not Found !!!',
          error: {
            code: 404,
            description: 'Orders not Found !!!',
          },
        });
      }
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
    next(error);
  }
};
//--------------- calculate price of all orders
const getTotalPriceOfOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;

    const existingUser = await userServices.getSingleUserById(userId);

    if (existingUser) {
      const total = await userServices.getTotalOfOrdersByID(userId);

      res.status(200).json({
        success: true,
        message: 'Got all Orders Total successfully!',
        totalPrice: total,
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
  addOrders,
  getAllOrders,
  getTotalPriceOfOrders,
};
