import { Schema, model } from 'mongoose';
import {
  methodUserModel,
  ordersdetails,
  userInformation,
} from './userInfo.interface';

const ordersDetailsSchema = new Schema<ordersdetails>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userInformationSchema = new Schema<userInformation, methodUserModel>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: { type: [ordersDetailsSchema] },
});
// hide passwordFeild when user want to creat userdoc
// userInformationSchema.pre('save', function (next) {
//   this.set('password', undefined);

//   next();
// });
userInformationSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  return userObject;
};
userInformationSchema.pre('save', function (next) {
  this.password = `${this.password}`;
  next();
});
// creating static method------
userInformationSchema.statics.doesUserExist = async function (userid: string) {
  try {
    const user = await this.findOne({ userId: userid });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(`Error checking if user exists`);
  }
};

// Create and export the User model
export const UserModel = model<userInformation, methodUserModel>(
  'User',
  userInformationSchema,
);
