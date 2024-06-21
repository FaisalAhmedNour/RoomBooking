import { Request, Response } from 'express';
import SlotModel from '../slot/slot.model';
import BookingModel from './booking.model';
import { bookingService } from './booking.service';

const createBooking = async (req: Request, res: Response) => {
  try {
    const { room, slots, user, totalAmount } = req.body;

    const newBooking = await bookingService.createBooking({
      room,
      slots,
      user,
      date: new Date(),
      totalAmount,
    });
    await bookingService.updateSlotBooking(slots);
    if(newBooking){
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Booking created successfully',
        data: newBooking,
      });
    }
    else{
      res.status(400).json({
        success: true,
        statusCode: 400,
        message: 'Booking creating failed',
        data: '',
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error creating booking',
      error,
    });
  }
};

const getBookingByUserId = async (req: Request, res: Response) => {
  try {
    const bookings = await BookingModel.find({ user: req.params.userId })
      .populate('room')
      .populate('slots');
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error retrieving bookings',
      error,
    });
  }
};

const cancelBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await BookingModel.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Booking not found',
      });
    }
    booking.isConfirmed = 'canceled';
    await booking.save();
    await SlotModel.updateMany(
      { _id: { $in: booking.slots } },
      { isBooked: false },
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Booking canceled successfully',
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error canceling booking',
      error,
    });
  }
};

export const bookingContollers = {
  createBooking,
  getBookingByUserId,
  cancelBookingById,
};
