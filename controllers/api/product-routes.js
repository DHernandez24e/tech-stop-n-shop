const router = require('express').Router();
const { Product, Category, Product_Profit } = require('../../models');

//GET all products
router.get('/', (req, res) => {
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock', 'image', 'category_id'],
        include: 
        [
        {
            model: Category,
            attributes: ['id', 'category_name']
        },
        {
            model: Product_Profit,
            attributes : ['id', 'num_sold', 'cost', 'product_id']
        }
    ]
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => res.status(500).json(err));
});

//GET single product
router.get('/:id', (req, res) => {
    Product.findOne({
        where: 
        
        {
            id: req.params.id
        },
        attributes: ['id', 'product_name', 'price', 'stock', 'image', 'category_id'],
        include: 
        [
        {
            model: Category,
            attributes: ['id', 'category_name']
        }, 
        {
            model: Product_Profit,
            attributes : ['id', 'num_sold', 'cost', 'product_id']
        }
    ]
    })
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(400).json({ message: 'No product found with this id' });
            return
        }
        res.json(dbProductData)
    })
    .catch(err => res.status(500).json(err));
});

//POST new product
router.post('/', (req, res) => {
    Product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.price,
        category_id: req.body.category_id
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => res.status(500).json(err));
});

//PUT update product
router.put('/:id', (req, res) => {
    Product.update(
        {
            stock: req.body.stock
          },
          {
            where: {
              id: req.params.id
            }
          } 
    )
    .then(dbProductData => res.json(dbProductData))
    .catch(err => res.status(500).json(err));
});

router.put('/sold/:id', (req, res) => {
    Product_Profit.update(
        {
            num_sold: req.body.num_sold
          },
          {
            where: {
              id: req.params.id
            }
          } 
    )
    .then(dbProductData => res.json(dbProductData))
    .catch(err => res.status(500).json(err));
});

//DELETE product
router.delete('/:id', (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(400).json({ message: 'No product found with this id' });
            return;
        }
        res.json(dbProductData)
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router