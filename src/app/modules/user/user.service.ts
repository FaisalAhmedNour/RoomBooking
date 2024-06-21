import { TUser } from './user.interface';
import UserModel from './user.model';

const createUser = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const findUserByEmail = async ({ email }: { email: string }) => {
  const result = await UserModel.findOne({ email });
  return result
};

export const userServices = {
  createUser,
  findUserByEmail,
};
