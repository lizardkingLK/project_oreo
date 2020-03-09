require('dotenv').config({ path: './config/config.env' })
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3001;
const items = require('./routes/api/items');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = require('./config/keys').mongoURI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true}, (err,db) => {
    console.log('db_oreo online...');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
});

app.use('/api/items', items);

server.listen(port, () => {
    console.log('api_oreo listening on port %s', port);
});