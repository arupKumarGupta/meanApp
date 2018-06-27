const express = require('express');
const _ = require('lodash');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const {
    User
} = require('../models/user');

router.post('/register', (req, res, next) => {
    let nU = _.pick(req.body, ['name', 'email', 'username', 'password']);
    // console.log(nU);
    let newUser = new User(nU);
    newUser.save().then(() => {
        res.json({
            success: true,
            msg: 'User registered'
        });
    }).catch((err) => {
        res.json({
            success: false,
            msg: 'Failed to register user' + err
        });
    });
});
router.post('/login', (req, res, next) => {
    let credentials = _.pick(req.body, ['email', 'username', 'password']);
    console.log(credentials);
    if (credentials.username != undefined) {
        //Find by username
        User.getUserByUsername(credentials.username).then((u) => {

            if (!u)
                return res.status(200).json({
                    success: false,
                    msg: "No User found!"
                });
            checkPassword(u, credentials.password, (err, match) => {
                if (err)
                    return res.status(500).json({
                        success: false,
                        msg: err
                    });
                if (match) {
                    const token = jwt.sign(u.toJSON(), config.secret, {
                        expiresIn: 60400
                    });

                    res.status(200).json({
                        success: true,
                        token: 'JWT ' + token,
                        user: u.toJSON()
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        msg: 'Invalid credentials'
                    });
                }
            });
        });
    } else {
        //Find by email
        User.getUserByEmail(credentials.email).then((u) => {
            if (!u)
                return res.status(200).json({
                    success: false,
                    msg: 'user not found!'
                });
            checkPassword(u, credentials.password, (err, match) => {
                if (err)
                    return res.status(500).json({
                        success: false,
                        msg: err
                    });
                if (match) {
                    const token = jwt.sign(u.toJSON(), config.secret, {
                        expiresIn: 60400
                    });

                    res.status(200).json({
                        success: true,
                        token: 'JWT ' + token,
                        user: u.toJSON()
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        msg: 'Invalid credentials'
                    });
                }
            });
        });

    }

});
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        user: req.user
    });
});

router.get('/dashboard', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        user: req.user
    });
});

function checkPassword(user, password, cb) {
    User.comparePassword(user.password, password, (err, match) => {
        if (err) return cb(err, null);
        if (match)
            return cb(null, true);

        return cb(null, false);
    });
}
module.exports = router;