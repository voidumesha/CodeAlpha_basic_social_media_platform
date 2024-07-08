import express from 'express';
import { getUser , updateUser , deleteUser , followUser, UnFollowUser } from '../handle/UserHandle.js';

const router = express.Router();

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', UnFollowUser);

export default router;
