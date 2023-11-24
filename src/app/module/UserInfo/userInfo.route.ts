import express from 'express';
import {
  controllGetAllUser,
  controllGetSingleStudent,
  controllGetSingleUserOrdersCOllection,
  controllOrderPriceSIngleUser,
  controllUpdateSingleUser,
  controllUserinfo,
  controlldeleteSingleUser,
} from './userInfo.controller';

export const userRouter = express.Router();
userRouter.post('/', controllUserinfo);
userRouter.get('/', controllGetAllUser);
userRouter.get('/:id', controllGetSingleStudent);
userRouter.delete('/:id', controlldeleteSingleUser);
userRouter.put('/:id', controllUpdateSingleUser);
userRouter.get('/:userId/orders', controllGetSingleUserOrdersCOllection);
userRouter.get('/:userId/orders/total-price', controllOrderPriceSIngleUser);
