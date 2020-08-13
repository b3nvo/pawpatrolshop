const router = require("express").Router();
const account = require("../controllers/user.controller");
const controller = require("../controllers/order.controller");

// POST
router.post(
  "/",
  account.checkUser,
  controller.validateOrder,
  controller.postOrder
);

// GET
router.get("/", account.checkAdmin, controller.getOrders);
// router.get(
//   "/:orderID",
//   account.checkUser,
//   account.checkOrderUser,
//   controller.getOrder
// );

// UPDATE
// router.put("/:orderID", account.checkUser, controller.updateOrderById);

// DELETE
// router.delete("/:orderID", account.checkUser, controller.DeleteOrderByID);

module.exports = router;
