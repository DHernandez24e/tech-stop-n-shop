const { Product } = require('../models');
const { SamPhone, MagTv, LenLap, iPhone, HpLap, Proj, VizTv, MacLap, SatPhone, ToshLap } = require('./imageUrls');

const productData = [
  {
    product_name: 'Samsung Galaxy Cell Phone',
    price: 398.0,
    stock: 5,
    category_id: 3,
    image: SamPhone,
    featured: true
  },
  {
    product_name: 'Magnavox Flat Screen TV',
    price: 280.0,
    stock: 7,
    category_id: 1,
    image: MagTv,
    featured: true
  },
  {
    product_name: 'Lenovo Laptop',
    price: 890.00,
    stock: 3,
    category_id: 2,
    image: LenLap,
    featured: true
  },
  {
    product_name: 'I Phone',
    price: 589.0,
    stock: 2,
    category_id: 3,
    image: iPhone,
    featured: false
  },
  {
    product_name: 'HP Laptop',
    price: 650.0,
    stock: 5,
    category_id: 2,
    image: HpLap,
    featured: false
  },
  {
    product_name: 'BenQ Business Projector',
    price: 650.70,
    stock: 6,
    category_id: 1,
    image: Proj,
    featured: false
  },
  {
    product_name: 'Vizio LED SmartTv',
    price: 150.70,
    stock: 7,
    category_id: 1,
    image: VizTv,
    featured: false
  },
  {
    product_name: 'MacBook Pro',
    price: 1109.90,
    stock: 3,
    category_id: 2,
    image: MacLap,
    featured: true
  },
  {
    product_name: 'Immarsat Satellite Phone',
    price: 589.00,
    stock: 6,
    category_id: 3,
    image: SatPhone,
    featured: false
  },
  {
    product_name: 'Toshiba Laptop',
    price: 1260.0,
    stock: 5,
    category_id: 2,
    image: ToshLap,
    featured: false
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;