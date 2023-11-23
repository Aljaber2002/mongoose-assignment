import { Schema, model } from 'mongoose';
import { ordersdetails, userInformation } from './userInfo.interface';

const ordersDetailsSchema = new Schema<ordersdetails>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userInformationSchema = new Schema<userInformation>({
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
  orders: { type: [ordersDetailsSchema], required: true },
});
// hide passwordFeild when user want to creat userdoc
userInformationSchema.pre('save', function (next) {
  this.set('password', undefined);

  next();
});

// Create and export the User model
export const UserModel = model<userInformation>('User', userInformationSchema);
