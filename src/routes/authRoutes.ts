import { Router } from 'express';
import { pageLogin } from '../controllers/pagesController';
import { register, login } from '../controllers/authController';

const router = Router();

router.get('/', pageLogin);
router.post('/login', login)
router.post('/register',register)

export default router;