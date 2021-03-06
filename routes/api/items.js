const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const Item = require('../../models/Item');

mongoose.set('useFindAndModify', false);
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req,res) => {
    res.send('items_oreo online...');
});



router.get('/allitems', (req,res) => {
    Item.find()
    .sort({date: -1})
    .then(items => {
        res.json(items);
    })
});

router.get('/searchitem/:itemId', (req,res) => {
    const itemId = req.params.itemId;
    const regex = new RegExp(escapeRegex(itemId), 'gi');
    Item.find({ "name": regex })
    .then( items => {
        res.json(items);
    })
});

router.get('/item/:itemId', (req,res) => {
    const id = req.params.itemId;
    Item.findById(id)
    .then(item => {
        if(item)
            res.json(item);
    })
});

router.post('/search', (req,res) => {
    const KW = req.body.keyword;
    Item.find( {$text: { $search: KW} })
    .then(items => {
        if(items)
            res.json(items);
        else
            res.json({msg: "No items found"});
    })
});

router.get('/men/:limit', (req,res) => {
    const limit = parseInt(req.params.limit);
    Item.find({
        category: 'men'
    })
    .sort( { dateCreated: 1 })
    .limit(limit)
    .exec((err,items) => {
        res.json(items);
    })
});

router.get('/women/:limit', (req,res) => {
    const limit = parseInt(req.params.limit);
    Item.find({
        category: 'women'
    })
    .sort( { dateCreated: 1 })
    .limit(limit)
    .exec((err,items) => {
        res.json(items);
    })
});

router.get('/kids/:limit', (req,res) => {
    const limit = parseInt(req.params.limit);
    Item.find({
        category: 'kids'
    })
    .sort( { dateCreated: 1 })
    .limit(limit)
    .exec((err,items) => {
        res.json(items);
    })
});

router.get('/collections/:limit', (req,res) => {
    const limit = parseInt(req.params.limit);
    Item.find({
        collections: true
    })
    .sort( { dateCreated: 1 })
    .limit(limit)
    .exec((err,items) => {
        res.json(items);
    })
});

router.post('/', auth, (req,res) => {
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

router.put('/:id',(req, res) =>{
        const id = req.params.id;

        Item.findById(id)

        .then(item =>{
                Item.findByIdAndUpdate(item, req.body,{
                    new : true,
                    runValidators: true
                })
                    .then(() => {
                        res.json({ success: true });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ success: false });
                    })
        });
})

router.put('/updatePrice/:itemId', (req,res) => {
    const id = req.params.itemId;
    const newPrice = req.body.newPrice;

    console.log(req.body);

    Item.findOneAndUpdate({_id: id}, {
        $set: {
            dateUpdated:  new Date().toISOString(),
            price: newPrice
        }
    }, {useFindAndModify: false})
    .then( () => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    Item.findById(id)
    .then( item => {
        Item.deleteOne(item)
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false });
        })
    });
});

router.post('/category', (req,res) => {
    const category = req.body.category;
    // console.log(category);
    Item.find({
        subcategories: { $all: category }
    })
    .then(items => {
        if(items)
            res.json(items);
        else
            res.json({msg: "No items found"});
    })
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
