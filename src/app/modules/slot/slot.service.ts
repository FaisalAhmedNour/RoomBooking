import SlotModel from './slot.model';

const createSlots = async (slot: any) => {
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
  const query: { isBooked: boolean; room?: string; date?: string } = {
    isBooked: true,
  };

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
