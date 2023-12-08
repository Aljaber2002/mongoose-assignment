import { ordersdetails, userInformation } from './userInfo.interface';
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
  const result = await UserModel.findOne({ userId: id }).select({
    password: 0,
    orders: 0,
  });
  const isUserExist = await UserModel.doesUserExist(id);
  if (!isUserExist) {
    throw new Error('user not found!');
  }

  return result;
};
export const updateSingleStudentfromDb = async (
  id: string,
  requireDoc: Partial<userInformation>,
) => {
  const isUserExist = await UserModel.doesUserExist(id);

  if (!isUserExist) {
    throw new Error(`user not found!`);
  }
  const result = await UserModel.findOneAndUpdate({ userId: id }, requireDoc, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const deleteSingleUser = async (id: string) => {
  const isExist = await UserModel.doesUserExist(id);
  if (!isExist) {
    throw new Error('user not found!');
  }
  const result = await UserModel.deleteOne({ userId: id });
  return result;
};
export const updateOrderForUser = async (
  id: string,
  product: ordersdetails,
) => {
  const isUserExist = await UserModel.doesUserExist(id);
  const singleUser: userInformation | null = await UserModel.findOne({
    userId: id,
  });
  if (singleUser?.orders && isUserExist) {
    const result = UserModel.updateOne(
      { userId: id },
      { $push: { orders: product } },
    );
    // singleUser.orders = [];
    return result;
  }
  throw new Error(`user not found!`);
};

export const getSingleUserOrderCollection = async (id: string) => {
  const isUserExist = await UserModel.doesUserExist(id);

  if (!isUserExist) {
    throw new Error(`user not found`);
  }
  const result = await UserModel.findOne({ userId: id }).select({
    orders: 1,
    _id: 0,
  });

  return result;
};
export const totalPriceOfOrdersSingleUser = async (id: string) => {
  const isUserExist = UserModel.doesUserExist(id);
  const parseid = Number(id);
  if (!isUserExist) {
    return Error(`user not found!`);
  }

  const result: userInformation | null = await UserModel.findOne({
    userId: parseid,
  });

  if (result === null) {
    throw new Error(`user not found!!`);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { orders }: any = result;
  let totalAmount = 0;
  orders.map((order: ordersdetails) => {
    const productPrice = order.price;
    const productQuantity = order.quantity;
    totalAmount = productPrice * productQuantity + totalAmount;
  });

  return { totalPrice: totalAmount };
};
