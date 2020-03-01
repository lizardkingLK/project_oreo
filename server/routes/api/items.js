const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

router.get('/', (req,res) => {
    res.send('items_oreo online...');
});

router.get('/allitems', (req,res) => {
    Item.find()
    .sort( { date: -1 })
    .then( items => {
        res.json(items);
    })
});

router.post('/', (req,res) => {
    const newItem = new Item( {
        name: req.body.name,
        amount: req.body.amount
    })

    newItem.save().then( item => res.json(item) )
});

module.exports = router;