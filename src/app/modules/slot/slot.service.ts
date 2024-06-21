import SlotModel from './slot.model';

const createSlots = async (slot: any) => {
  const result = await SlotModel.create(slot);
  return result;
};

const findSlotsByDateAndRoomId = async ({ room, date }: any) => {
  if (room && date) {
    const result = SlotModel.find({ room, date, isBooked: true });
    return result;
  } else if (room) {
    const result = SlotModel.find({ room, isBooked: true });
    return result;
  } else if (date) {
    const result = SlotModel.find({ date, isBooked: true });
    return result;
  } else {
    const result = SlotModel.find({ isBooked: true });
    return result;
  }
};
export const slotService = {
  createSlots,
  findSlotsByDateAndRoomId,
};
