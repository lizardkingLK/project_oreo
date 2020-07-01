const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const config = require('config');

const jwt = require('jsonwebtoken');


//StoreManager Model
const StoreManager = require('../../models/StoreManager');


router.use(express.json());

/*router.post("/loginManager", (req, res) => {

    const { errors, isValid } = loginValidation(req.body);

    // Checking login validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find the manager by email
    StoreManager.findOne({ email: email }).then(storeManager => {
        if (!storeManager) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
            if(password === storeManager.password) {
                const payload = {
                    id: storeManager.id,
                    fullName: storeManager.fullName
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3600
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        // });
    });
});*/


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


router.route('/addStoreManager').post(function(req, res) {
    let storeManager = new StoreManager(req.body);
    storeManager.save()
        .then(storeManager => {
            res.status(200).json({'StoreManager': 'StoreManager Added Successfully!'});
        })
        .catch(err => {
            res.status(400).send('Failed!');
        });
});

router.route('/updateStoreManager/:id').post(function(req, res) {
    StoreManager.findById(req.params.id, function(err, storeManager) {
        if (!storeManager)
            res.status(404).send("Data Not Found!");
        else
            storeManager.fullName = req.body.fullName;
            storeManager.gender = req.body.gender;
            storeManager.dob = req.body.dob;
            storeManager.address = req.body.address;
            storeManager.email = req.body.email;
            storeManager.password = req.body.password;

        storeManager.save().then(storeManager => {
            res.json('Store Manager Updated Successfully!');
        })
            .catch(err => {
                res.status(400).send("Update Failed!");
            });
    });
});

router.route('/deleteStoreManager/:id').get(function (req, res) {
    StoreManager.findByIdAndRemove({_id: req.params.id}, function(err, storeManager){
        if(err) res.json(err);
        else res.json('Store Manager Deleted Successfully!');
    });
});

module.exports = router;