import { Request, Response } from 'express';
import {
  creatUserIndb,
  deleteSingleUser,
  getAllUserfromdb,
  getSingleUserFromdb,
  getSingleUserOrderCollection,
  totalPriceOfOrdersSingleUser,
  updateSingleStudentfromDb,
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
export const controllUpdateSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const requireDoc = req.body.data;
    const result = await updateSingleStudentfromDb(id, requireDoc);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `${error.message}`,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
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
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log(error.message);
    res.status(500).json({
      success: false,
      message: `${error.message}`,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const controllGetSingleUserOrdersCOllection = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.userId;

    const result = await getSingleUserOrderCollection(id);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'order fetched successfully!',
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `${error.message}`,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const controllOrderPriceSIngleUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.userId;
    const result = await totalPriceOfOrdersSingleUser(id);
    // console.log(result, 'test');
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: `${result.totalPrice}`,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `${error.message}`,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
