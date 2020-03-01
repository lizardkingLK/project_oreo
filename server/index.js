const express = require('express');
const server = express();
const port = process.env.PORT || 5000;



server.get('/', (req,res) => {
    res.send('project_oreo');
});

server.listen(port, () => {
    console.log('project_oreo listening on port %s', port);
});

