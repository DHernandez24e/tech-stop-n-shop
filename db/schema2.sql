DROP DATABASE IF EXISTS tech_shop_db;

CREATE DATABASE tech_shop_db;
USE tech_shop_db;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS product_profit;

 CREATE TABlE user (
   id INTEGER PRIMARY KEY AUTO_INCREMENT,
   username VARCHAR(30),
   email VARCHAR(30),
   password VARCHAR(30)
   );

  CREATE TABLE product (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(30),
  price DECIMAL,
  stock INTEGER,
  user_id INTEGER,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
   );

  CREATE TABLE category (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(30),
  product_id INTEGER,
  CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL
  -- CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
  );

  CREATE TABLE product_profit (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  num_sold INTEGER,
  cost DECIMAL,
  stock INTEGER,
  product2_id INTEGER,
  CONSTRAINT fk_product2_id FOREIGN KEY (product2_id) REFERENCES product(id) ON DELETE SET NULL
   );