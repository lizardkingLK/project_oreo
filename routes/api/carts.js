const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Cart = require('../../models/Cart');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req,res) => {
    res.send('carts_oreo online...');
});

router.post('/', (req,res) => {
    const newCart = new Cart( {
        userId: req.body.userId
    })

    newCart.save().then(cart => res.json(cart));
});

router.get('/cart/:userId', (req,res) => {
    const userId = req.params.userId;
    Cart.find({
        userId: userId
    })
    .exec((err,carts) => {
        res.json(carts);
    })
});

router.put('/', (req,res) => {
    const id = req.body.cartId;

    Cart.findOneAndUpdate({_id: id}, {
        $set: { dateUpdated:  new Date().toISOString() },
        $push: { items: req.body.newItem }
    }, {useFindAndModify: false})
    .then( () => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

router.delete('/:cartId', (req,res) => {
    const id = req.params.cartId;

    Cart.findById(id).then( cart => {
        Cart.deleteOne(cart).then( () => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
    });
});

// router.put('/:cartId', (req, res) => {
//     const id = req.params.cartId;

//     Cart.findOneAndUpdate({_id: id}, {
//         $set: {
//             firstName: req.body.firstName, 
//             secondName: req.body.secondName, 
//             birthday: new Date(req.body.birthday)
//         }
//     }, {useFindAndModify: false})
//     .then( () => {
//         res.sendStatus(200);
//     }).catch(err => {
//         console.error(err);
//         res.sendStatus(500);
//     })
// });

module.exports = router;
