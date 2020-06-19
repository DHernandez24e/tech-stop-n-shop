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
    product_id:  5  },
  
];

const seed_Product_Profit = () => Tag.bulkCreate(product_profit_Data);

module.exports = seed_Product_Profit;
