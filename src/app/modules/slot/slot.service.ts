import { TSlot } from './slot.interface';
import SlotModel from './slot.model';

const createSlots = async (slot: Partial<TSlot>) => {
  const result = await SlotModel.create(slot);
  return result;
};

const findSlotsByDateAndRoomId = async ({
  room,
  date,
}: {
  room?: string;
  date?: string;
}) => {
  const query: { room?: string; date?: string } = {};

  if (room) {
    query.room = room;
  }

  if (date) {
    query.date = date;
  }

  const result = await SlotModel.find(query).populate('room');
  return result;
};

export const slotService = {
  createSlots,
  findSlotsByDateAndRoomId,
};
