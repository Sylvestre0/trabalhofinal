import { Router } from 'express';
import { updateUser, deleteUser, getAllUsers} from '../controllers/alterController';

const router = Router();

router.put('/alterUsers/:id', updateUser);
router.delete('/deleteUsers/:id', deleteUser);
router.get('/allUsers', getAllUsers)

export default router;
