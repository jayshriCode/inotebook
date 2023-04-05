const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'harryisagoodb$oy';

//Create a user using: POST "/api/auth/createuser". Doesnt require Auth
router.post('/createuser', [body('name', 'Enter a valid name').isLength({ min: 3 }),
body('email', 'Enter a valid email').isEmail(),
body('password', 'password must be atleast 5 characters').isLength({ min: 5 })],
    async (req, res) => {

        // If there are errors then return bad request & errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            //check wheather the user with this email already exist
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exist." })
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt) ;
            //create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data ={
                user:{
                    id:user.id
                }
            }
            
            const authToken = jwt.sign(data, JWT_SECRET);
            // res.json(user);
            res.json({authToken});
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured.");
        }
    })

module.exports = router;