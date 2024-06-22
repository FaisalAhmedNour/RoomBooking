import express from 'express';
import { adminAuth, auth } from '../../../Middlewares/auth';
import { bookingContollers } from './booking.controller';

// 1
const router = express.Router();

router.post('/', [auth], bookingContollers.createBooking);
router.get('/', [auth, adminAuth], bookingContollers.getBookings);
router.put('/:id', [auth, adminAuth], bookingContollers.updateBookingById);
router.delete('/:id', [auth, adminAuth], bookingContollers.deleteBookingById);

export const bookingRouter = router;

// 2
const router2 = express.Router();

router2.get('/', [auth], bookingContollers.getMyBookings);

export const bookingUserRouter = router2;
