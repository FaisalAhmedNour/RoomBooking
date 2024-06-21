import express from 'express';
import { adminAuth, auth } from '../../../Middlewares/auth';
import { slotContollers } from './slot.controller';

const router = express.Router();

router.post('/', [auth, adminAuth], slotContollers.createSlot);
router.get('/availability', auth, slotContollers.getSlot);
// router.get('/:roomId/:date', slotContollers.getSlot);
// router.delete('/:id', [auth, adminAuth], slotContollers.deleteSlot);

export const slotRouter = router;
 