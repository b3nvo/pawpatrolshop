const countryModel = require('../models/country.model');
const userAddressModel = require('../models/userAddress.model');
const userModel = require('../models/user.model');
const assert = require('assert');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;

exports.validateUser = (req, res, next) => {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    try {
        const {email, password, firstName, lastName, countryId, address, zipCode} = req.body;
        assert(typeof email === 'string', 'email is missing');
        assert.notEqual(email, '', 'email must have a value');
        assert.match(email, emailRegex, 'must be an email');
        assert(typeof password === 'string', 'password is missing');
        assert.notEqual(password, '', 'password must have a value');
        assert.ok(password.length > 7);
        assert(typeof firstName === 'string', 'first name is missing');
        assert.notEqual(firstName, '', 'first name must have a value');
        assert(typeof lastName === 'string', 'last name is missing');
        assert(typeof address === 'string', 'address is missing');
        assert.ok(address.length > 10);
        assert(typeof zipCode === 'string', 'Zipcode is missing');
        assert.ok((zipCode.length > 4) && (zipCode.length < 10));
        assert(typeof countryId === 'string', 'country is missing');
        next();
    } catch (err) {
        console.log(err, 'an error has occured: ');
        res.status(400).json({
            message: err.toString()
        });
    }
}

exports.addCountry = (req, res) => {
    try {
        const {name, countryCode} = req.body;

        var country = new countryModel({name: name, countryCode: countryCode});

        country.save((err, saved) => {
            if (err) res.status(400).json({ message: err.toString() });
            res.status(200).json({ message: 'added', data: saved});
        });
    } catch (err) {
        res.status(400).json({
            message: err.toString()
        });
    }
}

exports.addUser = (req, res) => {
    const {email, password, firstName, lastName, countryId, address, zipCode, city} = req.body;
    var access = 0; // default user
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) res.status(400).json({ message: err.toString() });
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) res.status(400).json({ message: err.toString() });

            var user = new userModel({email: email, password: hash, firstName: firstName, lastName: lastName, countryId: mongoose.Types.ObjectId(countryId), access: 1});

            user.save((err, saved) => {
                if (err) res.status(400).json({ message: err.toString() });

                var userAddress = new userAddressModel({address: address, zipCode: zipCode, city: city, userId: mongoose.Types.ObjectId(saved._id)});

                userAddress.save((err, saved) => {
                    if (err) res.status(400).json({message: err.toString() });

                    res.status(200).json({
                        message: 'added',
                        data: saved
                    });
                });
            });
        });
    });
}