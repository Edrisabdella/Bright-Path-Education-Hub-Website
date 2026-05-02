const express = require('express');
const { requestSession, getMySessions } = require('../controllers/tutoringController');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.use(protect);
router.post('/request', requestSession);
router.get('/my-sessions', getMySessions);

module.exports = router;