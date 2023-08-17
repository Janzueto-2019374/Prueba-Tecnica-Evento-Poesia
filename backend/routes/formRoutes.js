const express = require('express');
const router = express.Router();
const { addStudent } = require('../controllers/formController.js');

router.post('/submit', addStudent);

module.exports = router;
