const router = require('express').Router();
const sequelize = require('../config/connection');
const { Product, Category, Product_Profit } = require('../models');
// const {
//     Post,
//     User,
//     Comment
// } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    res.render('homepage', {});
  }); 

router.get('/profit', (req, res) => {
    console.log(req.session);
    res.render('profit', {});
  }); 

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
    //   res.json(dbPostData)
    //   const posts = dbPostData.map(post => post.get({ plain: true }));
    //   res.render('homepage', dbPostData[0].get({ plain: true }));
      res.render('profit', {
      //   posts
      //   loggedIn: req.session.loggedIn
      });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  
  });

// router.get('/', (req, res) => {
//     Post.findAll({
//             attributes: [
//                 'id',
//                 'post_url',
//                 'title',
//                 'created_at'
//                 //,[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//             ],
//             include: [
//                 /*{
//                   model: Comment,
//                   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                   include: {
//                     model: User,
//                     attributes: ['username']
//                   }
//                 },*/
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         })
//         .then(dbPostData => {
//             const posts = dbPostData.map(post => post.get({
//                 plain: true
//             }));
//             // pass a single post object into the homepage template
//             //res.render('homepage', { posts });
//             res.render('homepage', {
//                 posts,
//                 loggedIn: req.session.loggedIn
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'post_url',
                'title',
                'created_at'
                //,[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            include: [
                /*{
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                    model: User,
                    attributes: ['username']
                  }
                },*/
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            // serialize the data
            const post = dbPostData.get({
                plain: true
            });

            // pass data to template
            //res.render('single-post', { post });
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;