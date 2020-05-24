const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const Price = require('../../models/Price');

mongoose.set('useFindAndModify', false);
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req,res) => {
    res.send('prices_oreo online...');
});

router.get('/allPrices', (req,res) => {
    Price.find()
        .then(prices => {
            res.json(prices);
        })
});

router.post('/', (req,res) => {
    const newPrice = new Price({
        itemId: req.body.itemId,
        oldPrice: req.body.oldPrice,
        newPrice: req.body.newPrice,
        discount: req.body.discount,
        updatedOn: req.body.updatedOn
    });
    newPrice.save()
    .then(item => {
        res.json(item);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({"msg": "Add new price failed"});
    })
});

router.get('/price/:itemId', (req,res) => {
    const id = req.params.itemId;
    Price.findOne({
        itemId: id
    }).limit(1)
        .sort({
            $natural:-1
        })
        .then(newPrice => {
            res.json(newPrice);
        });
});

module.exports = router;