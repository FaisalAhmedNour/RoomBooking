import { Router } from 'express';
import { adminAuth, auth } from '../../../Middlewares/auth';
import { roomController } from './room.controller';

const router = Router();

router.get('/', auth, roomController.getAllRooms);
router.post('/', auth, roomController.createRoom);
router.get('/:id', auth, roomController.getRoom);
router.put('/:id', [auth, adminAuth], roomController.updateRoom);
router.delete('/:id', [auth, adminAuth], roomController.deleteRoom);

export const roomRouter = router;
