const express = require('express');
const router = express.Router();

//Collection Model
const Collection = require('../../models/Collection');

router.use(express.json());

router.route('/').get(function(req, res) {
    Collection.find(function(err, collections) {
        if (err) {
            console.log(err);
        } else {
            res.json(collections);
        }
    });
});

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Collection.findById(id, function(err, collection) {
        res.json(collection);
    });
});

router.route('/update/:id').post(function(req, res) {
    Collection.findById(req.params.id, function(err, collection) {
        if (!collection)
            res.status(404).send("Data is not found");
        else
            collection.collectionName = req.body.collectionName;
        collection.availability = req.body.availability;

        collection.save().then(collection => {
            res.json('Collection updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

router.route('/add').post(function(req, res) {
    let collection = new Collection(req.body);
    collection.save()
        .then(collection => {
            res.status(200).json({'collection': 'collection added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new collection failed');
        });
});

router.route('/delete/:id').delete(function (req, res) {
    const id = req.params.id;
    Collection.findById(id)
        .then (collection => {
            Collection.deleteOne(collection)
                .then(() => {
                    re.json({ success: true});
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ success: false });
                })
        });

});

module.exports = router;