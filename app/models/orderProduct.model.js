const mongoose = require("mongoose");
const orderProductScheme = new mongoose.Schema({
  orderProductId: mongoose.Types.ObjectId,
  product: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: null },
});

var schema = mongoose.model("Order_Product", orderProductScheme);

module.exports = schema;
