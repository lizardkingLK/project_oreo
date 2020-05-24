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

router.route('/addCategory').post(function(req, res) {
    let category = new Category(req.body);
    category.save()
        .then(category => {
            res.status(200).json({'Category': 'Category Added Successfully!'});
        })
        .catch(err => {
            res.status(400).send('Failed!');
        });
});

router.route('/updateCategory/:id').post(function(req, res) {
    Category.findById(req.params.id, function(err, category) {
        if (!category)
            res.status(404).send("Data Not Found");
        else
            category.categoryName = req.body.categoryName;
        category.categoryType = req.body.categoryType;

        category.save().then(category => {
            res.json('Category Updated Successfully!');
        })
            .catch(err => {
                res.status(400).send("Update Failed!");
            });
    });
});

router.route('/deleteCategory/:id').get(function (req, res) {

router.route('/primary/:limit').get(async function(req, res) {
    const cats = await Category.find({categoryType: "Primary"});
    if(cats){
        res.json(cats)
    } else {
        res.status(404).json("Not found")
    }
});

router.route('/secondary/:limit').get(async function(req, res) {
    const cats = await Category.find({categoryType: "Secondary"});
    if(cats){
        res.json(cats)
    } else {
        res.status(404).json("Not found")
    }
});

router.route('/ternary/:limit').get(async function(req, res) {
    const cats = await Category.find({categoryType: "Ternary"});
    if(cats){
        res.json(cats)
    } else {
        res.status(404).json("Not found")
    }
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
});

router.route('/delete/:id').get(function (req, res) {
    Category.findByIdAndRemove({_id: req.params.id}, function(err, category){
        if(err) res.json(err);
        else res.json('Category Deleted Successfully!');
    });
});

module.exports = router;