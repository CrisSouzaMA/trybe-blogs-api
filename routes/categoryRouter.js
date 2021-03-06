const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/categoryController');

const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, categoryController.getAllCategories);
router.post('/', authMiddleware, categoryController.create);

module.exports = router;