import { z } from 'zod';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
};

export const userValidationSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
  role: z.enum(['user', 'admin']),
});
