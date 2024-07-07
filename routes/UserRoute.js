import express from 'express';

const router = express.Router();
router.get('/', async(req, res) => {

    req.send("User Route")
});


export default router;
