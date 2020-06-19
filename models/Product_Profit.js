const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product_Profit extends Model {}

// create fields/columns for Post model
Product_Profit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      num_sold: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cost: {
        type: DataTypes.DECIMAL,
        allowNull: false

      },
   
      
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'product',
          key: 'id'
        }
      }

    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'product_profit'
    }
  );

  module.exports = Product_Profit;