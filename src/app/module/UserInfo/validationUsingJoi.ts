import Joi from 'joi';

export const ordersDetailsSchemaUsingJoi = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

export const userInformationSchemaUsingJoi = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  orders: Joi.array().items(ordersDetailsSchemaUsingJoi),
});

export const UpdateordersDetailsSchemaUsingJoi = Joi.object({
  productName: Joi.string().optional(),
  price: Joi.number().optional(),
  quantity: Joi.number().optional(),
});

export const UpdateuserInformationSchemaUsingJoi = Joi.object({
  userId: Joi.number().optional(),
  username: Joi.string().optional(),
  password: Joi.string().optional(),
  fullName: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
  }).optional(),
  age: Joi.number().optional(),
  email: Joi.string().email().optional(),
  isActive: Joi.boolean().optional(),
  hobbies: Joi.array().items(Joi.string()).optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
  orders: Joi.array().items(UpdateordersDetailsSchemaUsingJoi).optional(),
});
