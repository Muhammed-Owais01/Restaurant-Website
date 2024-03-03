const mongoose = require('mongoose');

const User = require('../models/user');
const MenuItem = require('../models/menu_item');

module.exports.addItem = (req, res, next) => {
    /* TODO:
        Add
        - Check item exists
        - Find user by id
        - push item in cart

        Delete
        - Check item exists
        - FInd user by id
        - delete item
    */

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
            res.status(500).json({message: "TEST"})
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "TEST2"});
    });
};