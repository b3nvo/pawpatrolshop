const orderModel = require("../models/order.models");
const orderProductModel = require("../models/orderProduct.model");
const mongoose = require("mongoose");
const assert = require("assert");

// CHECKS
exports.validateOrder = (req, res, next) => {
  try {
    const { user, totalPrice, products } = req.body;
    assert(typeof user === String, "User is missing");
    assert.notEqual(user, "", "cant be empty");
    assert(typeof totalPrice === String, "totalPrice is missing");
    assert.notEqual(totalPrice, "", "cant be empty");
    assert(typeof products === Array, "products are missing");
    next();
  } catch (err) {
    res.status(400).json({ message: err.toString() });
  }
};

// POST
exports.postOrder = (req, res) => {
  const { user, totalPrice, products } = req.body;

  try {
    const order = new orderProductModel({
      product: products,
    });

    order.save((err, saved) => {
      if (err) res.status(400).json({ message: err.toString() });

      const actualOrder = new orderModel({
        user: user,
        order_product: saved._id,
        totalPrice: totalPrice,
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

exports.getOrders = (req, res) => {
  orderModel
    .find()
    .populate("Order_Product")
    .populate("User")
    .exec((err, resp) => {
      if (err) res.status(400).json({ message: err.toString() });

      res.status(200).json({ message: "OK", data: resp });
    });
};
