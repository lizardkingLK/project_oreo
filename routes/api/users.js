const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req,res) => {
    res.send('users_oreo online...');
});

router.post('/', (req,res) => {
    const { name,email,password } = req.body;
    
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne( {email} )
    .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({
            name,
            email,
            password
        });
        
        // create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if(err) throw err;

                newUser.password = hash;

                newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user.id, email: user.email },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err,token) => {
                            if(err) throw err;
                            res.status(200).json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                },
                                token
                            });
                        }
                    )
                });
            });
        });
    });
});

module.exports = router;