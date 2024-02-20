const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')
    {
        cb(null, true);
    } else {cb(null, false)};
};

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});

const MenuItemsController = require('../controllers/menu_items');
const checkAuth = require('../middleware/check-auth');

router.get('/', MenuItemsController.menu_get_all_items);

router.get('/:menuItemId', MenuItemsController.menu_get_item);

router.post('/', checkAuth, upload.single('itemImage'), MenuItemsController.menu_post_item);

router.patch('/:menuItemId', checkAuth, MenuItemsController.menu_update_items);

router.delete('/:menuItemId', checkAuth, MenuItemsController.menu_delete_item);

module.exports = router;