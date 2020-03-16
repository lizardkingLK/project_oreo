const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

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

router.get('/men/:limit', (req,res) => {
    // console.log(req.params);
    const limit = req.param.limit;
    Item.find({
        category: 'men'
    })
    .limit(limit)
    .sort( { date: -1 })
    .then(items => {
        res.json(items);
    })
});

router.post('/', (req,res) => {
    const newItem = new Item( {
        name: req.body.name,
        type: req.body.type,
        category: req.body.category,
        subcategories: req.body.subcategories,
        description: req.body.description,
        images: req.body.images,
        storyUrl: req.body.storyUrl,
        sizes: req.body.sizes,
        price: req.body.price,
        dateCreated: req.body.dateCreated,
        dateUpdated: req.body.dateUpdated
    })

    newItem.save().then(item => res.json(item));
});

router.delete('/:id', (req,res) => {
    Item.findById(req.params.id)
    .then(item => {
        item.remove()
        .then(() => {
            res.json( {success: true} )
        })
    })
    .catch(err => {
        console.log(err);
        res.status(404).json( {success: false} )
    })
})

module.exports = router;