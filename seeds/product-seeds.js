const { Product } = require('../models');

const productData = [
  {
    product_name: 'Samsung Galaxy Cell Phone',
    price: 398.0,
    stock: 5,
    category_id: 3,
    image: 'https://images-na.ssl-images-amazon.com/images/I/81%2Bh9mpyQmL._AC_SX522_.jpg',
    featured: true
  },
  {
    product_name: 'Magnavox Flat Screen TV',
    price: 280.0,
    stock: 7,
    category_id: 1,
    image: 'https://www.magnavox.com/1208-home_default/65mv379rf7.jpg',
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