import { Request, Response } from 'express';
import {
  creatUserIndb,
  deleteSingleUser,
  getAllUserfromdb,
  getSingleUserFromdb,
} from './userInfo.service';

export const controllUserinfo = async (req: Request, res: Response) => {
  try {
    const userdata = req.body.data;
    const result = await creatUserIndb(userdata);
    res.status(200).send({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'unfortunately user not created',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const controllGetAllUser = async (req: Request, res: Response) => {
  try {
    const result = await getAllUserfromdb();
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'unfortunately user not created',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const controllGetSingleStudent = async (req: Request, res: Response) => {
  try {
    const userid = req.params.id;
    const result = await getSingleUserFromdb(userid);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(500).send({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const controlldeleteSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await deleteSingleUser(id);
    if (result.deletedCount === 1) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    return error;
  }
};
