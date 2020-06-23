const { Product } = require('../models');

const productData = [
  {
    product_name: 'Samsung Galaxy Cell Phone',
    price: 398.0,
    stock: 5,
    category_id: 3,
    featured: true
  },
  {
    product_name: 'Magnavox Flat Screen TV',
    price: 280.0,
    stock: 7,
    category_id: 1,
    featured: true
  },
  {
    product_name: 'Lenovo Laptop',
    price: 890.00,
    stock: 3,
    category_id: 2,
    featured: true
  },
  {
    product_name: 'I Phone',
    price: 589.0,
    stock: 2,
    category_id: 3,
    featured: false
  },
  {
    product_name: 'HP Laptop',
    price: 650.0,
    stock: 5,
    category_id: 2,
    featured: false
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;