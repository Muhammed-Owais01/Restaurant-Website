const MenuItem = require('../models/menu_item');
const mongoose = require('mongoose');

const handleError = (err, res) => {
    console.log(err);
    res.status(500).json({
        error: err.message
    });
};

exports.menu_get_all_items = (req, res, next) => {
    MenuItem.find()
        .select('name price _id itemImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                menuItems: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        itemImage: doc.itemImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/menu_items/${doc._id}'
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => handleError(err, res));
};

exports.menu_get_item = (req, res, next) => {
    const id = req.params.itemImage;
    MenuItem.findById(id)
        .select()
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    menuItem: doc,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/menu_items/${doc._id}"
                    }
                })
            }
        })
        .catch(err => handleError(err, res));
}

