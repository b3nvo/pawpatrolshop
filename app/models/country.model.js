const mongoose = require('mongoose');
const countryScheme = new mongoose.Schema({
    countryId: mongoose.Types.ObjectId,
    name: String,
    countryCode: String
});

var schema = mongoose.model("Country", countryScheme);

module.exports = schema;