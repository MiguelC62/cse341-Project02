const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const userController = require('../controllers/user');

router.get('/', userController.getAllUsers, requiresAuth());

router.get('/:username', userController.getUser, requiresAuth());

router.post('/', userController.createUser);

router.put('/:username', userController.updateUser, requiresAuth());

router.delete('/:username', userController.deleteUser, requiresAuth());

module.exports = router;

