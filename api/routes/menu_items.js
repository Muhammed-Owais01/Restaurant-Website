const express = require('express');
const router = express.Router();

const MenuItemsController = require('../controllers/menu_items');
const checkAuth = require('../middleware/check-auth');

router.get('/', MenuItemsController.menu_get_all_items);

router.get('/:menuItemId', MenuItemsController.menu_get_item);

router.post('/', checkAuth, MenuItemsController.menu_post_item);

router.post('/:menuItemId', MenuItemsController.menu_delete_item);

module.exports = router;