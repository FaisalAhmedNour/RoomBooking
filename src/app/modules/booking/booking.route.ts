import express from 'express';
import { adminAuth, auth } from '../../../Middlewares/auth';
import { bookingContollers } from './booking.controller';

const router = express.Router();

router.post('/', [auth], bookingContollers.createBooking);
router.get('/', [auth, adminAuth], bookingContollers.getBookings);

router.post('/:id/cancel', [auth], bookingContollers.cancelBookingById);

export const bookingRouter = router;

const router2 = express.Router();

router2.get('/', [auth], bookingContollers.getMyBookings);

export const bookingUserRouter = router2;
