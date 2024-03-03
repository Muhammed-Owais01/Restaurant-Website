const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart');
const checkAuth = require('../middleware/check-auth');

router.post('/:itemId', checkAuth, CartController.addItem);
//router.get('/', checkAuth, CartController.getItems);

module.exports = router;