const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        phoneField: 'phone',
        passwordField: 'password',
    }, async (phone, password, done) => {
        try {
            const exUser = await User.findOne({ where: { phone } });
            if(exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if(result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: "Password Not Exist" });
                }
            } else {
                done(null, false, { message: "User Not Found" });
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
}