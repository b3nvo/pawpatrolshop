const router = require('express').Router();
const productController = require('../controllers/product.controller');

//POST
router.post('/', productController.validateProduct, productController.addProduct);
router.post('/category', productController.validateCategory, productController.addCategory)

//GET
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.get('/category/:categoryId', productController.getProductsByCategoryId);

// //PUT
// router.put('/:productId', productController.updateProductById);
// router.put('/category/:categoryId', productController.updateProductByCategoryId);

// //DELETE
// router.delete('/:productId', productController.deleteProductById);
// router.delete('/category/:categoryId', productController.deleteCategory); 

module.exports = router;