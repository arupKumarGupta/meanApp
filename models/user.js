const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const _ = require('lodash');
mongoose.Promise = global.Promise;
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email', 'username', 'name']);
}
UserSchema.statics.getUserByUsername = (username) => {
        return User.findOne({
            username
        });
    },
    UserSchema.statics.getUserByEmail = (email) => {
        return User.findOne({
            email
        });
    },
    UserSchema.pre('save', function (next) {
        let newUser = this;
        console.log(newUser.isModified());
        if (newUser.isModified) {
            bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    console.log(newUser.toString());
                    newUser.password = hash;
                    console.log(newUser.toString());
                    next();
                });
            });
        } else
            next();
    });
UserSchema.statics.comparePassword = function (hash, cPassword, cb) {
    bcrypt.compare(cPassword, hash, (err, match) => {
        console.log("Match:", match);
        if (err)
            cb(err, null);
        cb(null, match);
    });
}
const User = mongoose.model('User', UserSchema);
module.exports = {
    User

}