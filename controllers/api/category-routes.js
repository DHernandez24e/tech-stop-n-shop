const router = require('express').Router();
const { Category, Product } = require('../../models');

//GET all categories
router.get('/', (req, res) => {
    Category.findAll({
        attributes: ['id', 'category_name'],
        include: {
            model: Product,
            attributes: ['id','product_name', 'price']
        }
    })
    .then(dbCatData => res.json(dbCatData))
    .catch(err => res.status(500).json(err));
});

//GET single category
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Product,
            attributes: ['product_name', 'price']
        }
    })
    .then(dbCatData => {
        if (!dbCatData) {
            res.status(400).json({ message: 'No category found with this id!' });
            return
        }
        res.json(dbCatData)
    })
    .catch(err => res.status(500).json(err));
});

//POST new category
router.post('/', (req, res) => {
    Category.create({
        category_name: req.body.category_name
    })
    .then(dbCatData => res.json(dbCatData))
    .catch(err => res.status(500).json(err));
});

//PUT update category
router.put('/:id', (req, res) => {
    Category.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbCatData => {
        if (!dbCatData) {
            res.status(400).json({ message: 'No category found with this id' })
            return
        }
        res.json(dbCatData)
    })
    .catch(err => res.status(500).json(err));
});

//DELETE category
router.delete('/:id', (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCatData => {
        if (!dbCatData) {
            res.status(400).json({ message: 'No category found with this id' })
            return
        }
        res.json(dbCatData)
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router