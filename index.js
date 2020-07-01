const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3001;
let uri = '';

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const prices = require('./routes/api/prices');
const carts = require('./routes/api/carts');
const categories = require('./routes/api/categories');
const storeManagers = require('./routes/api/storeManagers');
const wishlists = require('./routes/api/wishlists');
const reviews = require('./routes/api/reviews');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static assests if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder(s)
    app.use(express.static('client/build'));
    app.use(express.static('admin/build'));
    app.use(express.static('storemanager/build'));

    app.get('/'), (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    }

    app.get('/admin'), (req,res) => {
        res.sendFile(path.resolve(__dirname,'admin','build','index.html'));
    }
}

uri = config.get('mongoURI');
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (err,db) => {
    console.log('db_oreo online... ',uri);
});

app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/prices',prices);
app.use('/api/categories', categories);
app.use('/api/storeManagers', storeManagers);
app.use('/api/carts', carts);
app.use('/api/wishlists', wishlists);
app.use('/api/reviews', reviews);

server.listen(port, () => {
    console.log('api_oreo listening on port %s', port);
});