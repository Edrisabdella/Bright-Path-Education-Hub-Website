const express = require('express');
const { uploadResource, getResources } = require('../controllers/resourceController');
const { protect, restrictTo } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validate } = require('../middleware/validation');
const { uploadResourceValidation } = require('../validations/resourceValidation');

const router = express.Router();

router.get('/', getResources);
router.use(protect);
router.post('/', restrictTo('admin', 'tutor'), upload.single('file'), validate(uploadResourceValidation), uploadResource);

module.exports = router;