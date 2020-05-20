require('dotenv').config({ path: './config/config.env' })
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3001;
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const cat = require('./routes/api/categories');
let uri = '';

/*let cors = require('cors');
let bodyParser = require('body-parser');*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());*/


// serve static assests if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*'), (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    }
}

uri = config.get('mongoURI');
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (err,db) => {
    console.log('db_oreo online... ',uri);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
});

app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/categories',cat);

server.listen(port, () => {
    console.log('api_oreo listening on port %s', port);
});

// 404 Error
/*app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});*/