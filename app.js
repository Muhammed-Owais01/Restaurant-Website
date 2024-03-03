const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

const menuItemRoutes = require('./api/routes/menu_items');
const userRoutes = require('./api/routes/user');
const cartRoutes = require('./api/routes/cart');

app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// HANDLING CORS
app.use(cors())

mongoose.connect(
    `mongodb+srv://Muhammed_Owais:${process.env.MONGO_ATLAS_PW}@royaltaj.frnsjlq.mongodb.net/?retryWrites=true&w=majority`
);
mongoose.Promise = global.Promise;

app.use('/menuItems', menuItemRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;