import { Request, Response } from 'express';
import { slotService } from './slot.service';
import { slotValidationSchema } from './slot.interface';

const createSlot = async (req: Request, res: Response) => {
  try {
    const validation = slotValidationSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid slot data',
        error: validation.error.errors,
      });
    }

    const { room, date, startTime, endTime } = req.body;

    const start = new Date(`${date}T${startTime}:00Z`);
    const end = new Date(`${date}T${endTime}:00Z`);
    const slotDuration = 60;

    let currentTime = start;
    const slots = [];

    while (currentTime < end) {
      const nextTime = new Date(currentTime.getTime() + slotDuration * 60000);
      const newSlot = await slotService.createSlots({
        room,
        date,
        startTime: currentTime.toISOString().split('T')[1].substring(0, 5),
        endTime: nextTime.toISOString().split('T')[1].substring(0, 5),
      });
      slots.push(newSlot);
      currentTime = nextTime;
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Slots added successfully',
      data: slots,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error adding slots',
      error,
    });
  }
};

const getSlot = async (req: Request, res: Response) => {
  try {
    const { roomId, date }: { roomId?: string; date?: string } = req.query;

    const slots = await slotService.findSlotsByDateAndRoomId({
      room: roomId,
      date,
    });

    if (slots.length === 0) {
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
        message: 'Available slots retrieved successfully',
        data: slots,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Error retrieving slots',
      error,
    });
  }
};

export const slotContollers = {
  createSlot,
  getSlot,
};
