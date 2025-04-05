const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');


router.get('/', userController.getAllUsers);
router.get('/:Emp_id', userController.getUserById);
router.put('/:Emp_id', userController.updateUser);
router.delete('/:Emp_id', userController.deleteUser);

module.exports = router;
