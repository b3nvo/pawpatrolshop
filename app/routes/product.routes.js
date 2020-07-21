const router = require("express").Router();
const productController = require("../controllers/product.controller");

//POST
router.post(
  "/",
  productController.validateProduct,
  productController.addProduct
);
router.post(
  "/category",
  productController.validateCategory,
  productController.addCategory
);

//GET
router.get("/", productController.getAllProducts);
router.get("/product/:productId", productController.getProductById);
router.get("/category/:categoryId", productController.getProductsByCategoryId);
router.get("/latest", productController.getLatestProducts);

// //PUT
router.put("/:productId", productController.updateProductById);

// //DELETE
router.delete("/:productId", productController.deleteProductById);
router.delete("/category/:categoryId", productController.deleteCategoryById);

module.exports = router;
