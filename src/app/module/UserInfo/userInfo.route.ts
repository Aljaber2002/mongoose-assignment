import express from 'express';
import {
  controllGetAllUser,
  controllGetSingleUserOrdersCOllection,
  controllGetSingleuser,
  controllOrderPriceSIngleUser,
  controllUpdateSingleUser,
  controllUserinfo,
  controlldeleteSingleUser,
  controllupdateOrderForUser,
} from './userInfo.controller';

export const userRouter = express.Router();
userRouter.post('/', controllUserinfo);
userRouter.get('/', controllGetAllUser);
userRouter.get('/:userId', controllGetSingleuser);
userRouter.put('/:userId', controllUpdateSingleUser);
userRouter.delete('/:userId', controlldeleteSingleUser);
userRouter.put('/:userId/orders', controllupdateOrderForUser);

userRouter.get('/:userId/orders', controllGetSingleUserOrdersCOllection);
userRouter.get('/:userId/orders/total-price', controllOrderPriceSIngleUser);
