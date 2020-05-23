const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const WishList = require('../../models/WishList');

router.use(express.json());
router.use(express.urlencoded({ extended: false}));

router.get('/', (req,res) => {
    res.send('wishlists_oreo online...');
});

router.post('/', (req,res) => {
    const newWishList = new WishList( {
        userId: req.body.userId
    })

    newWishList.save().then(wishList => res.json(wishList));
});

router.put('/addItem', (req,res) => {
    const id = req.body.wishListItem;

    WishList.findOneAndUpdate({_id: id}, {
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

router.put('/removeItem', (req,res) => {
    const wishListId = req.body.cartId;
    const newItems = req.body.newItems;

    WishList.findOneAndUpdate({_id: wishListId}, {
        $set: { 
            dateUpdated: new Date().toISOString(),
            items: newItems
         }
    }, {useFindAndModify: false})
    .then( () => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

module.exports = router;