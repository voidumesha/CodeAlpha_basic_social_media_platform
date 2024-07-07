import express from 'express';

const router = express.Router();
router.get('/', (req, res) => {

    req.send("User Route")
});





export default router;
