const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.user_signup = (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1)
            {
                res.status(409).json({
                    message: "User Already Exists"
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err)
                    {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User Created"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        });
};

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(users => {
            if (users.length < 1)
            {
                console.log("User Not Found");
                return res.status(401).json({
                    message: "Authorization Failed"
                });
            }
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                if (err)
                {
                    console.log("PASS NOT MATCH");
                    return res.status(401).json({
                        message: "Authorization Failed"
                    });
                }
                if (result)
                {
                    const token = jwt.sign(
                    {
                        username: users[0].username,
                        userId: users[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "4h"
                    });
                    res.status(200).json({
                        message: "User logged in",
                        token: `Bearer ${token}`
                    });
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.delete_user = (req, res, next)=> {
    User.deleteOne({_id: req.params.userId})
        .exec()
        .then(user => {
            console.log(result);
            res.status(200).json({
                message: "User Deleted"
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
}