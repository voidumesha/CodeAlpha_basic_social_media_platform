import express from 'express';
import { createPost } from '../handle/Posthandle';

const router = express.Router();

router.post('/', createPost )

export default router;