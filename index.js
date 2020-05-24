const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const app = express();
const server = require('http').Server(app);


const port = process.env.PORT || 3001;
const items = require('./routes/api/items');  // items
const users = require('./routes/api/users');  // users
const auth = require('./routes/api/auth');  // auth
const categories = require('./routes/api/categories');  // categories
const storeManagers = require('./routes/api/storeManagers');  // storemanagers
const carts = require('./routes/api/carts');  // carts
let uri = '';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static assests if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('/home'), (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    }

    app.get('/admin'), (req,res) => {
        res.sendFile(path.resolve(__dirname,'admin','build', 'index.html'));
    }
}

app.get('/admin'), (req,res) => {
    res.sendFile(path.resolve(__dirname,'admin','build', 'index.html'));
}

uri = config.get('mongoURI');
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (err,db) => {
    console.log('db_oreo online... ',uri);
});


app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/categories', categories);
app.use('/api/storeManagers', storeManagers);
app.use('/api/carts', carts);

server.listen(port, () => {
    console.log('api_oreo listening on port %s', port);
});