const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { phone, password } = req.body;

    try {
        const user = await User.findOne({
            where: { phone: phone }
        });

        if(!user) {
            res.status(400).json({
                "message": "User Not Found"
            });
        } else {
            if(password == user.password) {
                res.status(200).json({
                    "message": "LOGIN SUCCESS"
                });
            } else {
                res.status(400).json({
                    "message": "Password Error"
                });
            }
        }
    } catch(e) {
        res.status(400).json({
            "message": "Client Error - " + e.toString()
        });
    }
});

module.exports = router;