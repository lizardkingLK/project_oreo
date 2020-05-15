const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Cart = require('../../models/Cart');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req,res) => {
    res.send('carts_oreo online...');
});

router.get('/cart/:userId', (req,res) => {
    const userId = parseInt(req.params.userId);
    Cart.find({
        userId: userId
    })
    .exec((err,carts) => {
        res.json(carts);
    })
});

router.post('/', (req,res) => {

});

module.exports = router;
