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
        type: req.body.type,
        category: req.body.category,
        quantity: req.body.quantity,
        size: req.body.size,
        dateCreated: req.body.dateCreated,
        dateUpdated: req.body.dateUpdated
    })

    console.log(req.body);

    newItem.save(function(err,item) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(item);
        }
    })
});

module.exports = router;