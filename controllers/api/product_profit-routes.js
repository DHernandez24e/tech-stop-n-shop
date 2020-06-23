const router = require('express').Router();
const { Product_Profit, Product, Category } = require('../../models');

//GET all product_profit
router.get('/', (req, res) => {
    Product_Profit.findAll({
        attributes: ['id', 'num_sold', 'cost', 'product_id'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
                include: {
                    model: Category,
                    attributes: ['id', 'category_name']
                }
            }
        ]
    })
    .then(dbProfitData => res.json(dbProfitData))
    .catch(err => res.status(500).json(err));
});

//GET one profit
router.get('/:id', (req, res) => {
    Product_Profit.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'num_sold', 'cost', 'product_id'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
                include: {
                    model: Category,
                    attributes: ['id', 'category_name']
                }
            }
        ]
    })
    .then(dbProfitData => {
        if (!dbProfitData) {
            res.status(500).json({ message: 'No profit data found with this id' })
            return
        }
        res.json(dbProfitData)
    })
    .catch(err => res.status(500).json(err));
});

//POST new profit data
router.post('/', (req, res) => {
    Product_Profit.create({
        num_sold: req.body.num_sold,
        cost:req.body.cost,
        product_id: req.body.product_id
    })
    .then(dbProfitData => res.json(dbProfitData))
    .catch(err => res.status(500).json(err));
});

//PUT update profit data
router.put('/:id', (req, res) => {
    Product_Profit.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbProfitData => req.json(dbProfitData))
    .catch(err => res.status(500).json(err));
});

//DELETE profit
router.delete('/:id', (req, res) => {
    Product_Profit.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProfitData => {
        if (!dbProfitData) {
            res.status(400).json({ message: 'No profit data found with this id' })
            return
        }
        res.json(dbProfitData)
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router