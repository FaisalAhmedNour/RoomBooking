import { Schema, model } from 'mongoose';
// import bcrypt from 'bcryptjs';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
  },
  {
    timestamps: true,
  },
);

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.isValidPassword = async function (
//   password: string,
// ): Promise<boolean> {
//   return await bcrypt.compare(password, this.password);
// };

const UserModel = model<TUser>('User', userSchema);
export default UserModel;
