const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (passportError, user, info) => {
        if(passportError || !user) {
            res.status(400).json({
                "message": info.reason
            });
            return;
        }

        req.login(user, { session: false }, (loginError) => {
            if(loginError) {
                res.status(400).json({
                    "message": loginError
                });
                return;
            }
            const token = jwt.sign(
                { phone: user.phone, name: user.name },
                'jwt-secret-key'
            );
            res.status(200).json({token});
        });
    })(req, res, next);
});