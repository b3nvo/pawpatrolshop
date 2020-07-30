const mongoose = require('mongoose');
const userScheme = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    createdAt: {type: Date, default: Date.now},
    countryId: {type: mongoose.Types.ObjectId, ref: 'Country'},
    access: Number,
    address: [{type: mongoose.Types.ObjectId, ref: 'User_Address'}]
});

userScheme.path('email').validate(async (email) => {
    var emailCount = await mongoose.models.User.countDocuments({ email });

    return !emailCount
}, 'Email already exists');

var schema = mongoose.model('User', userScheme);

module.exports = schema;