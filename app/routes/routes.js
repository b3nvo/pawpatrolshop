const router = require('express').Router();
const userRoutes = require('./user.routes');
// const productRoutes = require('product.routes');
// const orderRoutes = require('order.routes');

router.use('/users', userRoutes);
// router.all('/products', productRoutes);
// router.all('/orders', orderRoutes);

module.exports = router;