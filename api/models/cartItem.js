const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true},
    quantity: { type: Number, default: 1}
}, { versionKey: false, timestamps: true});

module.exports = mongoose.model('CartItem', cartItemSchema);