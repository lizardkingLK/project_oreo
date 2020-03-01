const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

const items = require('./routes/api/items');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/items', items);

app.listen(port, () => {
    console.log('api_oreo listening on port %s', port);
});