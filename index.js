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
const carts = require('./routes/api/carts');
const categories = require('./routes/api/categories');
const collections = require('./routes/api/collections');
const storeManagers = require('./routes/api/storeManagers');
const wishlists = require('./routes/api/wishlists');

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

    app.get('/storeManager'), (req,res) => {
        res.sendFile(path.resolve(__dirname,'storemanager','build','index.html'));
    }
}

uri = config.get('mongoURI');
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (err,db) => {
    console.log('db_oreo online... ',uri);
});

app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/categories', categories);
app.use('/api/collections', collections);
app.use('/api/storeManagers', storeManagers);
app.use('/api/carts', carts);
app.use('/api/categories', categories);
app.use('/api/wishlists', wishlists);

server.listen(port, () => {
    console.log('api_oreo listening on port %s', port);
});