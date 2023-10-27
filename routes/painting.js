const express = require('express');
const router = express.Router();

const paintingController = require('../controllers/painting');

router.get('/', paintingController.getAllPaintings);
router.get('/:stylename', paintingController.getPainting);
router.post('/', paintingController.createPainting);
router.delete('/:title', paintingController.deletePainting);

module.exports = router;
