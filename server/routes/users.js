const express = require('express');
const { getProfile, updateProfile, getAllUsers } = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { updateProfileValidation } = require('../validations/userValidation');

const router = express.Router();

router.use(protect);
router.get('/profile', getProfile);
router.patch('/profile', validate(updateProfileValidation), updateProfile);
router.get('/', restrictTo('admin'), getAllUsers);

module.exports = router;