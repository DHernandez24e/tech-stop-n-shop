const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seed_Product_Profit = require('./product_profit-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seed_Product_Profit();
  console.log('\n----- PRODUCT PROFIT SEEDED -----\n');

  process.exit(0);
};

seedAll();
