const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const saltRound = 12;

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
            let hashPassword = "";
            await bcrypt.genSalt(saltRound, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) {
                        return res.status(400).json({
                            "message": "Client Error - " + err.toString()
                        });
                    } else {
                        hashPassword = hash;
                    }
                });
            });

            if(hashPassword == user.password) {
                const token = jwt.sign({
                    phone: user.phone,
                    name: user.name,
                    division: user.division
                }, 'secretkey');

                res.status(200).json({
                    "token": token
                    // "name": user.name,
                    // "phone": user.phone,
                    // "division": user.division,
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