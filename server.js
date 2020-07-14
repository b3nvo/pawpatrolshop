require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const routes = require('./app/routes/routes');
const db = require('./app/db');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, ()=>console.log('server is listening to port ' + port));

app.use('/api', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;
