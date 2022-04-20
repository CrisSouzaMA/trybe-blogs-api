const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');

const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, postController.getAll);
router.post('/', authMiddleware, postController.create);

module.exports = router;
