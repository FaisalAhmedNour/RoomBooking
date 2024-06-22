import { z } from 'zod';

export type TRoom = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
};

export const roomValidationSchema = z.object({
  name: z.string(),
  roomNo: z.number(),
  floorNo: z.number(),
  capacity: z.number(),
  pricePerSlot: z.number(),
  amenities: z.array(z.string()),
  isDeleted: z.boolean(),
});