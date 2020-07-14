const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@pawpatrolshop.j082l.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to db');
});

module.exports = db;