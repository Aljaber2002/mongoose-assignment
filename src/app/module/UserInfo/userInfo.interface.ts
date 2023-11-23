import { Model } from 'mongoose';

export type ordersdetails = {
  productName: string;
  price: number;
  quantity: number;
};

export type userInformation = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: ordersdetails[];
};

export interface methodUserModel extends Model<userInformation> {
  // eslint-disable-next-line no-unused-vars
  doesUserExist(id: string): Promise<boolean>;
}
