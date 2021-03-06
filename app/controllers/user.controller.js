const countryModel = require('../models/country.model');
const userAddressModel = require('../models/userAddress.model');
const userModel = require('../models/user.model');
const assert = require('assert');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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

exports.checkAdmin = (req, res, next) => {
    const token = req.get('Token');
    console.log('token created', token);
    try {
        console.log('starting try/catch');
        jwt.verify(token, 'secret', (err, decoded) => {
            console.log(decoded);
            console.log('verifying');
            if (err) { res.status(400).json({ message: err.toString() }); }

            if (decoded.access < 1) {
                console.log('decoded', decoded);
                res.status(400).json({
                    message: 'not allowed!'
                })
            } else {
                next();
            }
        })
    } catch (err) {
        console.log('catch');
        res.status(400).json({ message: err.toString() });
    }
}

exports.acceptAdmin = (req, res) => {
    res.status(200).json({
        message: "OK"
    })
}

exports.checkUser = (req, res, next) => {
    const token = req.get('Token');
    console.log('token created', token);
    try {
        console.log('starting try/catch');
        jwt.verify(token, 'secret', (err, decoded) => {
            console.log('verifying');
            if (err) { res.status(400).json({ message: err.toString() }); }
            
            console.log('decoded', decoded);
            req.userId = decoded.id;
            next();
        })
    } catch (err) {
        console.log('catch');
        res.status(400).json({ message: err.toString() });
    }
}

exports.validateLogin = (req, res, next) => {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    try {
        const { email, password } = req.body;
        assert(typeof email === 'string', 'email is missing');
        assert.notEqual(email, '', 'email needs to have a value');
        assert.match(email, emailRegex, 'email needs to be in correct format');
        assert(typeof password === 'string', 'password is missing');
        assert.notEqual(password, '', 'password needs to have a value');
        assert.ok(password.length > 7, 'password too short');
        next();
    } catch (err) {
        res.status(400).json({ message: err.toString() });
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

exports.getCountries = (req, res) => {
    try { 
        countryModel.find().exec((err, resp) => {
            if (err) res.status(400).json({ message: err.toString()});

            res.status(200).json({data: resp});
        })
    } catch (err) {
        res.status(400).json({ message: err.toString() });
    }
}

exports.getUsers = (req, res) => {
    try {
        userModel
        .find()
        .populate('address')
        .populate('countryId')
        .exec((err, resp) => {
            if (err) res.status(400).json({ message: err.toString() });

            console.log(resp);
            res.status(200).json({data: resp});
        })
    } catch (err) {
        res.status(400).json({ message: err.toString() });
    }
}

exports.addUser = (req, res) => {
    const {email, password, firstName, lastName, countryId, address, zipCode, city} = req.body;
    var access = 0; // default user
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) res.status(400).json({ message: err.toString() });
        bcrypt.hash(password, salt, (error, hash) => {
            if (error) res.status(400).json({ message: error.toString() });
            
            const userAddress = new userAddressModel(
                {address: address, zipCode: zipCode, city: city }
            );
            
            userAddress.save((errs, saved) => {
                if (errs) res.status(400).json({message: errs.toString() });

                var user = new userModel(
                    {
                        email: email, 
                        password: hash, 
                        firstName: firstName, 
                        lastName: lastName, 
                        countryId: mongoose.Types.ObjectId(countryId), 
                        access: 0,
                        address: saved._id
                    }
                );

                user.save((errr, saved) => {
                    if (errr) res.status(400).json({ message: errr.toString() });

                    if (saved !== undefined) {
                        
                    }
                
                    res.status(200).json({
                        message: 'added',
                        data: saved
                    });

                });
            });
        });
    });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.find({email: email});

    if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) res.status(400).json({ message: err.toString() });

            if (result) {
                const payload = {
                    id: user[0]._id,
                    email: user[0].email, 
                    access: user[0].access
                }

                jwt.sign(
                    payload,
                    "secret",
                    { expiresIn: "12h"},
                    (err, token) => {
                        if (err) {
                            res.status(400).json({
                                message: "error signing the token",
                                err: err.toString()
                            });
                        } else {
                            const result = {
                                token: token,
                                email: user[0].email,
                            }
                            res.status(200).json(result);
                        }
                    }
                )
            } else {
                res.status(400).json({ message: "password is incorrect"});
            }
        })
    } else {
        res.status(404).json({ message: 'user not found!'});
    }
}

exports.updateUser = (req, res) => {
    const { firstName, lastName, countryId, address, zipCode, city } = req.body;

    userModel.findOneAndUpdate(
    {
        _id: mongoose.Types.ObjectId(req.params.userId)
    }, 
    { 
        firstName: firstName, 
        lastName: lastName, 
        countryId: mongoose.Types.ObjectId(countryId)
    },
    (err, resp) => {

        if (err) res.status(400).json({ message: err.toString() });
        userAddressModel.findOneAndUpdate(
            {
                userId: mongoose.Types.ObjectId(req.params.userId)
            },
            {
                address: address,
                zipCode: zipCode,
                city: city,
                UpdatedAt: Date.now()
            },
            (err, resp) => {
                if (err) res.status(400).json({ message: err.toString() });
                console.log(resp)
                res.status(200).json({ message: 'updated'});
            }
        );
    });
    
}

exports.deleteUser = (req, res) => {
    // later email toevoegen voor extra beveiliging
    
    userModel.findByIdAndDelete(mongoose.Types.ObjectId(req.params.userId), (err, resp) => {
        if (err) res.status(400).json({ message: err.toString() });

        console.log('user', resp);
        userAddressModel.findOneAndDelete({userId: mongoose.Types.ObjectId(req.params.userId)}, (err, resp) => {
            if (err) res.status(400).json({message: err.toString() });

            console.log('useraddress', resp);
            res.status(200).json({ message: 'deleted'}); 
        });
    });
}