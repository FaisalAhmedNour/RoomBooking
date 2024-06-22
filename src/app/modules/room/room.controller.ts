import { Request, Response } from 'express';
import { roomService } from './room.service';
import { roomValidationSchema } from './room.interface';

const getAllRooms = async (req: Request, res: Response) => {
  try {
    const room = await roomService.findAllRooms();
    if (room.length === 0) {
      res.status(200).json({
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Room retrieved successfully',
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error retrieving room',
      error,
    });
  }
};

const createRoom = async (req: Request, res: Response) => {
  const roomData = req.body;

  try {
    const room = await roomService.createRoom(roomData);

    const validation = roomValidationSchema.safeParse(roomData);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid room data',
        error: validation.error.errors,
      });
    }

    if (room) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Room added successfully',
        data: room,
      });
    } else {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Error adding room',
        error: '',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error adding room',
      error,
    });
  }
};

const getRoom = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const room = await roomService.findRoomByEmail(id);
    if (!room) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Room not found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Room retrieved successfully',
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error retrieving room',
      error,
    });
  }
};

const updateRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const room = await roomService.updateRoomById(id, updateData);

    if (!room) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Room not found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Room updated successfully',
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error updating room',
      error,
    });
  }
};

const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const room = await roomService.deleteRoomById(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Room not found',
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Room deleted successfully',
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error deleting room',
      error,
    });
  }
};

export const roomController = {
  getAllRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
};
