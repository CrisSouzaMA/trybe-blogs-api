const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');

const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, postController.getAll);
router.get('/:id', authMiddleware, postController.getById);
router.post('/', authMiddleware, postController.create);
router.put('/:id', authMiddleware, postController.updatePost);

module.exports = router;
