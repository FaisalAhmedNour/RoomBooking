import { Schema } from 'mongoose';

export type TBooking = {
  room: Schema.Types.ObjectId;
  slots: Schema.Types.ObjectId[];
  user: Schema.Types.ObjectId;
  date: Date;
  totalAmount: number;
  isConfirmed: 'unconfirmed' | 'confirmed' | 'canceled';
  isDeleted: boolean;
};
