const mongoose = require("mongoose");
const countryScheme = new mongoose.Schema({
  orderId: mongoose.Types.ObjectId,
  status: { type: String, default: "Processing" },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: null },
  order_product: { type: mongoose.Types.ObjectId, ref: "Order_Product" },
  totalPrice: { Type: mongoose.Types.Decimal128 },
});

var schema = mongoose.model("Order", countryScheme);

module.exports = schema;
