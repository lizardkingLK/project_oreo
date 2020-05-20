const express = require('express');
const router = express.Router();

//Category Model
const Category = require('../../models/Category');

router.use(express.json());

router.route('/').get(function(req, res) {
    Category.find(function(err, categories) {
        if (err) {
            console.log(err);
        } else {
            res.json(categories);
        }
    });
});

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Category.findById(id, function(err, category) {
        res.json(category);
    });
});

router.route('/update/:id').post(function(req, res) {
    Category.findById(req.params.id, function(err, category) {
        if (!category)
            res.status(404).send("data is not found");
        else
            category.categoryName = req.body.categoryName;
        category.categoryType = req.body.categoryType;

        category.save().then(category => {
            res.json('Category updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

router.route('/add').post(function(req, res) {
    let category = new Category(req.body);
    category.save()
        .then(category => {
            res.status(200).json({'category': 'category added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new category failed');
        });
});

router.route('/type/:type').get(function(req, res) {
    const categoryType = req.params.type;
    Category.find({
        categoryType: categoryType
    })
    .then(categories => {
        if(categories)
            res.status(200).json(categories);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: 'error getting data'});
    })

router.route('/delete/:id').get(function (req, res) {
    Category.findByIdAndRemove({_id: req.params.id}, function(err, category){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = router;