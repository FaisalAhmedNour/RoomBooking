import SlotModel from "../slot/slot.model";
import BookingModel from "./booking.model";

const createBooking = async(booking: any) =>{
    const result = await BookingModel.create(booking);
    return result;
}

const updateSlotBooking = async(slots: string[]) =>{
    const result = await SlotModel.updateMany({ _id: { $in: slots } }, { isBooked: true });
    return result;
}

export const bookingService = {
    createBooking,
    updateSlotBooking 
}