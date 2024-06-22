import { Request, Response } from 'express';
import { bookingService } from './booking.service';
import { UserRequest } from '../../../Middlewares/auth';

const createBooking = async (req: Request, res: Response) => {
  try {
    const { room, slots, user, date } = req.body;
    const newBooking = await bookingService.createBooking({
      room,
      slots,
      user,
      date: new Date(date),
    });

    await bookingService.updateSlotBooking(slots);
    if (newBooking) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Booking created successfully',
        data: newBooking,
      });
    } else {
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

const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();

    if (bookings.length === 0) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Available bookings retrieved successfully',
        data: bookings,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error retrieving bookings',
      error,
    });
  }
};

const getMyBookings = async (req: UserRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const bookings = await bookingService.getMyBookings(userId);
    if (bookings.length === 0) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Bookings retrieved successfully',
        data: bookings,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error retrieving bookings',
      error,
    });
  }
};

const updateBookingById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const bookings = await bookingService.updateBookingById(id, req.body);

    if (bookings.modifiedCount > 0) {
      const modifiedBooking = await bookingService.getBookingById(id);
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Bookings retrieved successfully',
        data: modifiedBooking,
      });
    } else {
      res.status(400).json({
        success: true,
        statusCode: 400,
        message: 'Bookings retrieving unsuccessful',
        error: '',
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error retrieving bookings',
      error,
    });
  }
};

const deleteBookingById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const bookings = await bookingService.updateBookingById(id, {
      isDeleted: true,
    });
    if (bookings.modifiedCount > 0) {
      const modifiedBooking = await bookingService.getBookingById(id);
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Booking deleted successfully',
        data: modifiedBooking,
      });   
    } else {
      res.status(400).json({
        success: true,
        statusCode: 400,
        message: 'Bookings deleting unsuccessful',
        error: '',
      });
    }
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
  updateBookingById,
  deleteBookingById,
  getBookings,
  getMyBookings,
};
