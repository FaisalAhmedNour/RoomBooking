import express from 'express'
import { auth } from "../../../Middlewares/auth";
import { bookingContollers } from "./booking.controller";

const router = express.Router()

router.post('/', [auth], bookingContollers.createBooking)
router.post('/user/:userId', [auth], bookingContollers.getBookingByUserId)
router.post('/:id/cancel', [auth], bookingContollers.cancelBookingById)

export const bookingRouter = router;
 