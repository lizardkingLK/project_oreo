const express = require('express');
const router = express.Router();

//StoreManager Model
const StoreManager = require('../../models/StoreManager');

router.use(express.json());

router.route('/').get(function(req, res) {
    StoreManager.find(function(err, storeManagers) {
        if (err) {
            console.log(err);
        } else {
            res.json(storeManagers);
        }
    });
});

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    StoreManager.findById(id, function(err, storeManager) {
        res.json(storeManager);
    });
});

router.route('/update/:id').post(function(req, res) {
    StoreManager.findById(req.params.id, function(err, storeManager) {
        if (!storeManager)
            res.status(404).send("data is not found");
        else
            storeManager.fullName = req.body.fullName;
            storeManager.gender = req.body.gender;
            storeManager.dob = req.body.dob;
            storeManager.address = req.body.address;
            storeManager.email = req.body.email;
            storeManager.password = req.body.password;

        storeManager.save().then(storeManager => {
            res.json('Store Manager updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

router.route('/add').post(function(req, res) {
    let storeManager = new StoreManager(req.body);
    storeManager.save()
        .then(storeManager => {
            res.status(200).json({'storeManager': 'storeManager added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new storeManager failed');
        });
});

router.route('/delete/:id').get(function (req, res) {
    StoreManager.findByIdAndRemove({_id: req.params.id}, function(err, storeManager){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = router;