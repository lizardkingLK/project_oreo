const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Review = require('../../models/Review');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req,res) => {
    res.send('reviews_oreo online...');
});

router.get('/allReviews', (req,res) => {
    Review.find()
    .then(reviews => {
        res.json(reviews);
    })
});

router.post('/', (req,res) => {
    const newReview = new Review( {
        itemId: req.body.itemId,
        rating: req.body.rating,
        title: req.body.title,
        userId: req.body.userId,
        description: req.body.description
    })

    newReview.save().then(review => res.json(review));
});

router.get('/item/:itemId', (req,res) => {
    const id = req.params.itemId;
    Review.find({
        itemId: id
    })
    .then(comments => {
        res.json(comments);
    })
});

module.exports = router;