const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const userController = require('../controllers/user');

router.get('/', requiresAuth(userController.getAllUsers));

router.get('/:username', requiresAuth(userController.getUser));

router.post('/', userController.createUser);

router.put('/:username', requiresAuth(userController.updateUser));

router.delete('/:username', requiresAuth(userController.deleteUser));

module.exports = router;

