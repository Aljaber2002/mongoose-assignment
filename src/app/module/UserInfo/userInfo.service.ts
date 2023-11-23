import { userInformation } from './userInfo.interface';
import { UserModel } from './userInfo.model';

export const creatUserIndb = async (user: userInformation) => {
  const result = await UserModel.create(user);
  return result;
};
export const getAllUserfromdb = async () => {
  const result = await UserModel.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};
export const getSingleUserFromdb = async (id: string) => {
  //   console.log(typeof id);
  const result = await UserModel.findOne({ userId: id }).select({
    password: 0,
  });
  const isUserExist = await UserModel.doesUserExist(id);
  if (!isUserExist) {
    console.log(isUserExist);
  }

  return result;
};
export const deleteSingleUser = async (id: string) => {
  const isExist = await UserModel.doesUserExist(id);
  if (!isExist) {
    console.log(isExist);
  }
  const result = await UserModel.deleteOne({ userId: id });
  return result;
};
