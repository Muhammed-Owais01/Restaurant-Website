const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart');
const checkAuth = require('../middleware/check-auth');

router.post('/:itemId', checkAuth, CartController.addItem);

router.delete('/:itemId', checkAuth, CartController.deleteItem);

module.exports = router;