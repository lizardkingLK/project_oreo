require('dotenv').config({ path: './config/config.env' })
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3001;
const items = require('./routes/api/items');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let uri = require('./config/keys').mongoURI_B || process.env.mongoURI_A;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true}, (err,db) => {
    console.log('db_oreo online...');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
});

app.use('/api/items', items);

// serve static assests if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*'), (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    }
}

server.listen(port, () => {
    console.log('api_oreo listening on port %s', port);
});