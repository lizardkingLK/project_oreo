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





/*router.route('/delete/:id').delete((req, res, next) => {

    CategorySchema.findByIdAndRemove(req.params.id, (error, data) => {

        if (error) {

            return next(error);

        } else {

            res.status(200).json({

                msg: data

            })

        }

    })

})*/



module.exports = router;