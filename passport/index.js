// const passport = require('passport');
// const local = require('./localStrategy');
// const User = require('../models/user');
//
// module.exports = () => {
//     passport.serializeUser((user, done) => {
//         done(null, user.phone);
//     });
//
//     passport.deserializeUser((phone, done) => {
//         User.findOne({ where: { phone } })
//             .then(user => done(null, user))
//             .catch(err => done(err));
//     });
//
//     local();
// }

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const passportConfig = { phoneField: 'phone', passwordField: 'password' };

const passportVerify = async (phone, password, done) => {
    try {
        const user = await User.findOne({ where: { phone: phone } });
        if (!user) {
            done(null, false, { reason: 'User Not Exist' });
            return;
        }

        const compareResult = await bcrypt.compare(password, user.password);

        if (compareResult) {
            done(null, user);
            return;
        }

        done(null, false, { reason: 'Password Not Exist' });
    } catch (error) {
        console.error(error);
        done(error);
    }
};

module.exports = () => {
    passport.use('local', new LocalStrategy(passportConfig, passportVerify));
};