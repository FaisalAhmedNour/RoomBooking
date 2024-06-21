import { Schema } from "mongoose";

export type TSlot = {
    room: Schema.Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    isBooked: boolean;
  }