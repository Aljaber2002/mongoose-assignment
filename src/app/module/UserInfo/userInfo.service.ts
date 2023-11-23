import { userInformation } from './userInfo.interface';
import { UserModel } from './userInfo.model';

export const creatUserIndb = async (user: userInformation | null) => {
  const result = await UserModel.create(user);
  return result;
};
