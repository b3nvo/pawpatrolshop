const mongoose = require('mongoose');
const db = null;
try{ 
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@pawpatrolshop.j082l.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set('useFindAndModify', false);
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('connected to db');
    });
    
} catch (err) {
    res.status(500).json({ message: err.toString() });
}

module.exports = db;