const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    Product,
    User,
    Comment
} = require('../models');

router.get('/', (req, res) => {
    Product.findAll({
        where: {
            featured: true
        },
            attributes: [
                'id',
                'product_name',
                'price',
                'stock'
            ],
            // include: [
            //     /*{
            //       model: Comment,
            //       attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            //       include: {
            //         model: User,
            //         attributes: ['username']
            //       }
            //     },*/
            //     {
            //         //  model: Product
            //         // attributes: ['username']
            //     }
            // ]
        })
        .then(dbPostData => {
            const products = dbPostData.map(products => products.get({
                plain: true
            }));
            // pass a single post object into the homepage template
            //res.render('homepage', { posts });
            
            let loginStatus;
            if (typeof req.session.passport != 'undefined') {
                loginStatus = req.session.passport.user.id;
            } else {
                loginStatus = false;
            }

            res.render('homepage', {
                products,
                loggedIn: loginStatus
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
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