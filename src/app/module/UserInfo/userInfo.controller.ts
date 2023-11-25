import { Request, Response } from 'express';
import {
  creatUserIndb,
  deleteSingleUser,
  getAllUserfromdb,
  getSingleUserFromdb,
  getSingleUserOrderCollection,
  totalPriceOfOrdersSingleUser,
  updateOrderForUser,
  updateSingleStudentfromDb,
} from './userInfo.service';
import {
  ordersDetailsSchemaUsingJoi,
  userInformationSchemaUsingJoi,
} from './validationUsingJoi';

export const controllUserinfo = async (req: Request, res: Response) => {
  try {
    const userdata = req?.body?.data;
    const { error } = userInformationSchemaUsingJoi.validate(userdata);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'unfortunately user not created .Message from joi!!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const result = await creatUserIndb(userdata);
    res.status(200).send({
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
export const controllGetAllUser = async (req: Request, res: Response) => {
  try {
    const result = await getAllUserfromdb();
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'unfortunately no user found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const controllGetSingleuser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await getSingleUserFromdb(id);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: `${error.message}`,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const controllUpdateSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const requireDoc = req.body.data;
    const { error } = userInformationSchemaUsingJoi.validate(requireDoc);
    if (error) {
      res.status(500).send({
        success: false,
        message: 'invalid information.message from joi!',
      });
    }
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
    const id = req.params.userId;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await totalPriceOfOrdersSingleUser(id);

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
export const controllupdateOrderForUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const expectedProduct = req.body.data;
    const { error } = ordersDetailsSchemaUsingJoi.validate(expectedProduct);
    if (error) {
      res.status(500).send({
        success: false,
        message: 'invalid information!! message from joi!',
      });
    }
    const id = req.params.userId;
    const result = await updateOrderForUser(id, expectedProduct);
    if (result.modifiedCount >= 1) {
      res.status(200).json({
        success: true,
        message: 'order created successfully',
        data: null,
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
