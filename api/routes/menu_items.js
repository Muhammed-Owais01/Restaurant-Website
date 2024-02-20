const express = require('express');
const router = express.Router();

const MenuItemsController = require('../controllers/menu_items');

router.get('/', MenuItemsController.menu_get_all_items);

router.get('/:menuItemId', MenuItemsController.menu_get_item);

module.exports = router;