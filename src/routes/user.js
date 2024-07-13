import express from 'express';
import { createUser, getAllUsers, loginUser } from '../controllers/user.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', createUser);
router.post('/login', loginUser);

export default router;
