const router = require('express').Router();

// const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
// const commentRoutes = require('./comment-routes');
router.use('/products', productRoutes);
// router.use('/posts', postRoutes);
// router.use('/comments', commentRoutes);
module.exports = router;