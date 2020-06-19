const router = require('express').Router();
// const { Comment } = require('../../models');
const { Product, User, Product_Profit, Category } = require('../../models');


router.get('/', (req, res) => {
    console.log('======================');
    Product.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
        'category_id'
      //   [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        // include the Comment model here:
        {
          model: Category,
          attributes: ['id', 'category_name']
  
        },
        {
          model: Product_Profit,
          attributes: ['id', 'num_sold', 'cost', 'product_id']
        }
      ]
     })
     .then(dbPostData => {
      // pass a single post object into the homepage template
      console.log(dbPostData[0]);
      res.json(dbPostData)
    //   const posts = dbPostData.map(post => post.get({ plain: true }));
    //   res.render('homepage', dbPostData[0].get({ plain: true }));
      // res.render('profit', {
      //   posts
      //   loggedIn: req.session.loggedIn
      // });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  
  });

  module.exports = router;