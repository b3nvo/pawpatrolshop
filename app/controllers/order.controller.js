const orderModel = require("../models/order.models");
const orderProductModel = require("../models/orderProduct.model");
const mongoose = require("mongoose");
const assert = require("assert");

// CHECKS
exports.validateOrder = (req, res, next) => {
    try {
        const { totalPrice, products } = req.body;
        const userId = req.userId;
        console.log(typeof userId);
        assert(typeof userId === "string", "userId is missing");
        assert.notEqual(userId, "", "userId cant be an Empty value");
        assert(typeof totalPrice === "string", "totalPrice is missing");
        Array.isArray((err, res) => {
            console.log("is array err", err);
            console.log("is array resp", res);
        });

        // later needs payment information.
        // this is fine for test

        next();
    } catch (err) {
        res.status(400).json({ message: err.toString() });
    }
};

// POST
exports.postOrder = (req, res) => {
    const { totalPrice, products } = req.body;
    const user = req.userId;

    try {
        const order = new orderProductModel({
            product: products
        });

        order.save((err, saved) => {
            if (err) res.status(400).json({ message: err.toString() });

            const actualOrder = new orderModel({
                user: mongoose.Types.ObjectId(user),
                order_product: saved._id,
                totalPrice: totalPrice
            });

            actualOrder.save((err, saved) => {
                if (err) res.status(400).json({ message: err.toString() });

                res.status(200).json({ message: "OK" });
            });
        });
    } catch (err) {
        res.status(400).json({ message: err.toString() });
    }
};

exports.getOrders = async (req, res) => {
    orderModel
        .find()
        .populate({
            path: "order_product",
            populate: { path: "product" }
        })
        .populate({
            path: "user",
            populate: [{ path: "address" }, { path: "countryId" }]
        })
        .exec((err, resp) => {
            if (err) res.status(400).json({ error: err.toString() });

            res.status(200).json({ message: "OK", data: resp });
        });
};
