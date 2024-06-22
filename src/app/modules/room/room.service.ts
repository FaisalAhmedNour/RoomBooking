import RoomModel from './room.model';
import { TRoom } from './room.interface';

const createRoom = async (room: TRoom) => {
  const result = await RoomModel.create(room);
  return result;
};

const findRoomByEmail = async (id: string) => {
  const result = await RoomModel.findById(id);
  return result;
};
 
const findAllRooms = async () => {
  const result = await RoomModel.find({});
  return result;
};

const updateRoomById = async (id: string, updateData: Partial<TRoom>) => {
  const result = await RoomModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};

const deleteRoomById = async (id: string) => {
  const result = await RoomModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const roomService = {
  createRoom,
  findRoomByEmail,
  findAllRooms,
  updateRoomById,
  deleteRoomById,
};
