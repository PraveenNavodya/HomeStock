const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventoryController');

router.post('/add', controller.createItem);
router.get('/', controller.getItems);
router.put('/update/:id', controller.updateItem);
router.delete('/delete/:id', controller.deleteItem);

module.exports = router;
