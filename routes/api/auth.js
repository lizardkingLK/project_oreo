const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req,res) => {
    res.send('auth_oreo online...');
});

router.post('/', (req,res) => {
    const { email,password } = req.body;
    
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne( {email} )
    .then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exist' });
        
        // validate authentication
        bcrypt.compare(password ,user.password)
        .then(boolMatch => {
            if(!boolMatch) return res.status(400).json({ msg: 'Invalid credentials' });
            
            jwt.sign(
                { id: user.id, email: user.email },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err,token) => {
                    if(err) throw err;

                    res.json({
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        },
                        token
                    });
                }
            )
        })
        
    });
});

router.get('/user', auth, (req,res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;