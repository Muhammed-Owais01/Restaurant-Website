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
        .select('_id name price itemImage')
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

exports.menu_post_item = (req, res, next) => {
    const menu_item = new MenuItem({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        itemImage: req.file.path
    });
    menu_item.save()
    .then(result => {
        console.log("Sucessfully Created");
        res.status(200).json({
            message: "Item Created Successfully",
            item: menu_item._id
        });
    })
    .catch(err => handleError(err, res));
}

exports.menu_delete_item = (req, res, next) => {
    MenuItem.deleteOne({_id: req.body.id})
    .exec()
    .then(item => {
        res.status(200).json({
            message: "Item deleted"
        })
    })
    .catch(err => handleError(err, res));
}