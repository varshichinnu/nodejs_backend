
const express = require('express');

const dairyfarmController = require('../controllers/dairyfarmController');
const verifyToken = require('../middlewares/verifyToken');
const Dairyfarm = require('../models/dairyfarm');

const router = express.Router();
router.post('/add-dairyfarm', verifyToken, dairyfarmController.addDairyfarm );

router.get('/uploads/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(Path.join(__dirname, '..', 'uploads', imageName));
});
router.delete('/:dairyfarmId', dairyfarmController.deleteDairyfarmById);

module.exports = router;
