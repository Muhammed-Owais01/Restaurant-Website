const mongoose = require('mongoose');

const User = require('../models/user');
const MenuItem = require('../models/menu_item');

module.exports.addItem = (req, res, next) => {
    MenuItem.findById(req.params.itemId)
    .exec()
    .then(menuItem => {
        if (!menuItem) return res.status(404).json({ message: "Item not found" });
        User.findByIdAndUpdate(req.userData.userId, { $push: { cart: menuItem} }, { new: true }) // new returns the modified document
        .exec()
        .then(updatedUser => {
            if (!updatedUser) return res.status(404).json({ message: "User Not Found"});
            res.status(200).json({message: "Item added to cart", user: updatedUser});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ Error: err })
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ Error: err });
    });
};

exports.deleteItem = (req, res, next) => {
    User.findByIdAndUpdate(req.userData.userId)
    .exec()
    .then(updateUser =>{
        if (!updateUser) return res.status(404).json({ message: "User Not Found" });
        const itemIndex = updateUser.cart.findIndex(item => String(item._id) === req.params.itemId);
        if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart"});
        updateUser.cart.splice(itemIndex, 1);
        updateUser.save()
        .then(savedUser => {
            res.status(200).json({ message: "Item removed from cart"});
        })
        .catch(err => {console.log(err); res.status(500).json({ error: err })});
    })
    .catch(err => { console.log(err); res.status(500).json({error: err})});
};