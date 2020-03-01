const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('items online...');
});

module.exports = router;