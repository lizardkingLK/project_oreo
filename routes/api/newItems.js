const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

// Student Model
const Item = require('../../models/Item');

router.use(express.json());

// CREATE Student
router.route('/addItems').post((req, res, next) => {
    Item.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ Students
router.route('/').get((req, res) => {
    Item.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single Student
router.route('/edit-item/:id').get((req, res) => {
    Item.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Student
router.route('/update-item/:id').put((req, res, next) => {
    Item.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Student updated successfully !')
        }
    })
})

// Delete Student
router.route('/delete-item/:id').delete((req, res, next) => {
    Item.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;

