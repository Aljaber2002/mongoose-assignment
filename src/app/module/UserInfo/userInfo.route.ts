import express from 'express';
import {
  controllGetAllUser,
  controllGetSingleStudent,
  controllUserinfo,
  controlldeleteSingleUser,
} from './userInfo.controller';

export const userRouter = express.Router();
userRouter.post('/', controllUserinfo);
userRouter.get('/', controllGetAllUser);
userRouter.get('/:id', controllGetSingleStudent);
userRouter.delete('/:id', controlldeleteSingleUser);
