const express = require('express');
const router = express.Router();
const { attendController } = require('../controller');

router.get('', attendController.index);
router.post('', attendController.create);

module.exports = router;
