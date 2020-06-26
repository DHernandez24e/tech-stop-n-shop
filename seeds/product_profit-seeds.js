const { Product_Profit } = require('../models');

const product_profit_Data = [
  {
    num_sold: 7,
    cost: 200.0 ,
    product_id:  1
  },
  {
    num_sold: 5,
    cost: 100.0 ,
    product_id:  2
  },
  {
    num_sold: 3,
    cost: 500.0 ,
    product_id:  3
  },
  {
    num_sold: 2,
    cost: 350.0 ,
    product_id:  4
  },
  {
    num_sold: 4,
    cost: 400.0 ,
    product_id:  5
  },
  {
    num_sold: 5,
    cost: 300.0,
    product_id: 6
  },
  {
    num_sold: 8,
    cost: 100.50,
    product_id: 7
  },
  {
    num_sold: 3,
    cost: 900.90,
    product_id: 8
  },
  {
    num_sold: 6,
    cost: 400.70,
    product_id: 9
  },
  {
    num_sold: 4,
    cost: 1050.40,
    product_id: 10
  }
];

const seed_Product_Profit = () => Product_Profit.bulkCreate(product_profit_Data);

module.exports = seed_Product_Profit;
