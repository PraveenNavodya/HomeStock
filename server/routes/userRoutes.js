const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/add', userController.createUser);
router.get('/', userController.getUsers);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

// ✅ Add login route
router.post('/login', userController.loginUser);

module.exports = router;
