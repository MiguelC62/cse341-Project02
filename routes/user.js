const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getAllUsers);

router.get('/:stylename', userController.getUser);

router.post('/', userController.createUser);

//router.put('/:id', userController.updateContact);

//router.delete('/:id', userController.deleteContact);

module.exports = router;

