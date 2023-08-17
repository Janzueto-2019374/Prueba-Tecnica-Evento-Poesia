const express = require('express');
const router = express.Router();
const { getReport } = require('../controllers/formController');

router.get('/report', getReport);

module.exports = router;
