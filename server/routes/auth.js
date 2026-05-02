const express = require('express');
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const { registerValidation, loginValidation } = require('../validations/authValidation');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', authLimiter, validate(registerValidation), register);
router.post('/login', authLimiter, validate(loginValidation), login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;