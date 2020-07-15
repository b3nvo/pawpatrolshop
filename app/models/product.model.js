const mongoose = require('mongoose');
const productScheme = new mongoose.Schema({
    productId: mongoose.Types.ObjectId,
    name: String,
    description: String, 
    price: mongoose.Types.Decimal128,
    weight: Number,
    createdAt: {type: Date, default: Date.now},
    categoryId: mongoose.Types.ObjectId
});

var schema = mongoose.model("Product", productScheme);

module.exports = schema;