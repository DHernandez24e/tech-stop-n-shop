const router = require('express').Router();
const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
const categoryRoutes = require('./category-routes');
const profitRoutes = require('./product_profit-routes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/profits', profitRoutes);

module.exports = router