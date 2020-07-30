const mongoose = require('mongoose');
const userAddressScheme = new mongoose.Schema({
    userAddressId: mongoose.Types.ObjectId,
    address: String,
    zipCode: String,
    CreatedAt: {type: Date, default: Date.now},
    UpdatedAt: {type: Date, default: null},
});

var schema = mongoose.model("User_Address", userAddressScheme);

module.exports = schema;