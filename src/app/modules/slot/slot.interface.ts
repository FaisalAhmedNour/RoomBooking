import { z } from 'zod';
import { Schema } from 'mongoose';

export type TSlot = {
  room: Schema.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export const slotValidationSchema = z.object({
  room: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
