const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {}

// create fields/columns for Post model
Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    //   price: {
    //     type: DataTypes.NUMBER,
    //     allowNull: false
    //     // validate: {
    //     //   isURL: true
    //     // }
    //   },
      // product_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'product',
      //     key: 'id'
      //   }
      // }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'category'
    }
  );

  module.exports = Category;