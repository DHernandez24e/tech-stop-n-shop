const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Television',
  },
  {
    category_name: 'Laptop',
  },
  {
    category_name: 'Cell Phone',
  }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
