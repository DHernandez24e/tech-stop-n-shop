const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

// create fields/columns for Post model
Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false
        // validate: {
        //   isURL: true
        // }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
        // references: {
        //   model: 'user',
        //   key: 'id'
        // }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'product'
    }
  );