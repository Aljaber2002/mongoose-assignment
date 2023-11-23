import express from 'express';
import { controllUserinfo } from './userInfo.controller';

export const userRouter = express.Router();
userRouter.post('/', controllUserinfo);
