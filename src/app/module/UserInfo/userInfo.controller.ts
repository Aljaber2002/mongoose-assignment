import { Request, Response } from 'express';
import { creatUserIndb } from './userInfo.service';

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
