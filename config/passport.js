const {
    Strategy,
    ExtractJwt
} = require('passport-jwt');
const {
    User
} = require('../models/user');
const config = require('../config/database');
module.exports = function (passport) {
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    options.secretOrKey = config.secret;
    passport.use(new Strategy(options, (jwtPayload, done) => {
        User.findById(jwtPayload._id).then((user) => {
            if (!user)
                return done(null, false);
            return done(null, user);
        }).catch((err) => {
            return done(err, false);
        });
    }));
}