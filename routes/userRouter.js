const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getByIdUser);
router.post('/', userController.create);

module.exports = router;