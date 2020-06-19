const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User_Product extends Model {}

// create fields/columns for Post model
User_Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'product',
          key: 'id'
        }
      },        
      user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'user_product'
    }
  );

  module.exports = User_Product;