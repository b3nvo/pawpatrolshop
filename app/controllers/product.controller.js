const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');
const mongoose = require('mongoose');
const assert = require('assert');

exports.validateProduct = (req, res, next) => {
    try {
        const { name, description, price, weight, categoryId} = req.body;
        assert(typeof name === 'string', 'name is missing');
        assert.notEqual(name, '', 'name must have a value');
        assert.ok(name.length > 4, 'name is too short');
        assert(typeof description === 'string', 'description is missing');
        assert.notEqual(description, '', 'description must have a value');
        assert.ok(description.length > 10, 'description is too short');
        assert(typeof price === 'number', 'price is missing');
        assert(typeof weight === 'number', 'weight is missing');
        assert(typeof categoryId === 'string');
        next();
    } catch (err) {
        res.status(400).json({ message: err.toString() });
    }
}

exports.validateCategory = (req, res, next) => {
    try { 
        const { name } = req.body;
        assert(typeof name === 'string', 'name is missing');
        assert.notEqual(name, '', 'name must have a value');
        assert.ok(name.length > 2, 'name is too short');
        next();
    } catch (err) { 
        res.status(400).json({ message: err.toString() });
    }
}

exports.addProduct = (req, res) => {
    // later admin beveiliging toevoegen

    const { name, description, price, weight, categoryId } = req.body;
    try {
        var product = new productModel(
            {
                name: name,
                description: description,
                price: price,
                weight: weight,
                categoryId: mongoose.Types.ObjectId(categoryId)
            }
        );

        product.save((err, saved) => {
            if (err) res.status(400).json({ message: err.toString() });

            console.log('product', saved);
            res.status(200).json({ message: 'product added'});
        })

    } catch (err) {
        res.status(400).json({ message: err.toString() });
    }
}

exports.addCategory = (req, res) => { 
    const { name } = req.body;

    try {
        var category = new categoryModel({name: name});

        category.save((err, saved) => {
            if (err) res.status(400).json({ message: err.toString() });

            console.log('category', saved);
            res.status(200).json({ message: 'category saved'});
        })
    } catch (err) {
        res.status(400).json({ message: err.toString() });
    }
}

exports.getAllProducts = (req, res) => {
    
    productModel.find((err, resp) => {
        if (err) res.status(400).json({ message: err.toString() });

        console.log('products - GET', resp);
        res.status(200).json({ 
            message: 'OK',
            data: resp
        });
    })
}

exports.getProductById = (req, res) => {
    productModel.findById(req.params.productId, (err, resp) => {
        if (err) res.status(400).json({ message: err.toString() });

        console.log('product by id - GET ', resp);
        res.status(200).json({
            message: 'OK',
            data: resp
        });
    })
}

exports.getProductsByCategoryId = (req, res) => {
    productModel.find(
        {
            categoryId: mongoose.Types.ObjectId(req.params.categoryId)
        }, 
        (err, resp) => {
            if (err) res.status(400).json({ message: err.toString() });

            console.log('products by category', resp);
            res.status(200).json({ message: 'OK', data: resp});
        }
    );
}