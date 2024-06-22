import { Date } from 'mongoose';
import SlotModel from '../slot/slot.model';
import BookingModel from './booking.model';
import RoomModel from '../room/room.model';
import { TBooking } from './booking.interface';

const createBooking = async (booking: {
  room: string;
  slots: string;
  user: string;
  date: Date | object;
}) => {
  const room = await RoomModel.findById(booking.room);
  if (room) {
    const result = (
      await (
        await (
          await BookingModel.create({
            ...booking,
            totalAmount: room?.pricePerSlot * booking.slots.length,
            isConfirmed: 'unconfirmed',
            isDeleted: false,
          })
        ).populate('user')
      ).populate('room')
    ).populate('slots');
    return result;
  } else {
    return undefined;
  }
};

const updateSlotBooking = async (slots: string[]) => {
  const result = await SlotModel.updateMany(
    { _id: { $in: slots } },
    { isBooked: true },
  );
  return result;
};

const getAllBookings = async () => {
  const result = await BookingModel.find({})
    .populate('user')
    .populate('room')
    .populate('slots');
  return result;
};

const getMyBookings = async (id: string) => {
  const result = await BookingModel.find({ user: id })
    .populate('room')
    .populate('slots')
    .select('-user');
  return result;
};

const updateBookingById = async (id: string, data: Partial<TBooking>) => {
  const result = await BookingModel.updateOne({ _id: id }, data);
  return result;
};

const getBookingById = async (id: string) => {
  const result = await BookingModel.findById(id);
  return result;
};

export const bookingService = {
  createBooking,
  updateSlotBooking,
  getAllBookings,
  getMyBookings,
  updateBookingById,
  getBookingById,
};
