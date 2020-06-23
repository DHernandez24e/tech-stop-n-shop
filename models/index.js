const User = require("./User");
const Product = require("./Product");
const Product_Profit = require("./Product_Profit");
const Category = require("./Category");
const User_Product = require("./User_Product");

// create associations

User.belongsToMany(Product, {
  through: User_Product,
  as: 'user-and-product',
  foreignKey: 'user_id'
});

Product.belongsToMany(User, {
  through: User_Product,
  as: 'user-and-product',
  foreignKey: 'user_id'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id'
  });

Category.hasMany(Product, {
    foreignKey: 'category_id'
  });

Product_Profit.belongsTo(Product, {
    foreignKey: 'product_id'
  });

Product.hasMany(Product_Profit, {
    foreignKey: 'product_id'
  });

module.exports = { User, Product, Product_Profit, Category, User_Product };
