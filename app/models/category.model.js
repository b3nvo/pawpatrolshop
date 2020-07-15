const mongoose = require('mongoose');
const categoryScheme = new mongoose.Schema({
    categoryId: mongoose.Types.ObjectId,
    name: String,
});

var schema = mongoose.model("Category", categoryScheme);

module.exports = schema;