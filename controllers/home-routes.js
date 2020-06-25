const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    Product,
    User,
    Category,
    Product_Profit
} = require('../models');


//GET all products
router.get('/profit', (req, res) => {
    Category.findAll({
        attributes: ['id', 'category_name'],
        include: 
        // [
        {
            model: Product,
            attributes: ['product_name', 'price', 'stock'],
            include: {
                model: Product_Profit,
                attributes: ['num_sold','cost']
              }
        },

    })
  .then(dbPostData => {

    let test2 = JSON.stringify(dbPostData);
    let parsePost =JSON.parse(JSON.stringify(dbPostData));
    console.log(parsePost);
    let test = parsePost[1].products[0].product_profits[0].num_sold;
    let lengthTest = parsePost.length;
    console.log("lengthTest is :");
    console.log(test)
    var soldTimesCost = 0
    var inventTimesCost = 0
    var soldTimesPrice = 0

    for (let i = 0; i < parsePost.length; i++) {

        for (let j = 0; j < parsePost[i].products.length; j++) {
        soldTimesCost = soldTimesCost + parsePost[i].products[j].product_profits[0].num_sold*parsePost[i].products[j].product_profits[0].cost;
        inventTimesCost = inventTimesCost + parsePost[i].products[j].stock*parsePost[i].products[j].product_profits[0].cost;
        soldTimesPrice = soldTimesPrice + parsePost[i].products[j].product_profits[0].num_sold*parsePost[i].products[j].price;


        }

    }

    let debtTotal = soldTimesCost + inventTimesCost
    let incomeTotal = soldTimesPrice;
    let profitTotal = incomeTotal - debtTotal;
    if (profitTotal > 0){
        var profitFlag = true;
    } else {
        var profitFlag = false;
    }
    console.log(debtTotal)
    console.log(incomeTotal)


    console.log(parsePost)

    let loginStatus;
    if (typeof req.session.passport != 'undefined') {
        loginStatus = req.session.passport.user.id;
    } else {
        loginStatus = false;
    }
    res.render('profit', {parsePost, profitTotal, profitFlag, test2, loggedIn: loginStatus});

  })
  .catch(err => res.status(500).json(err));
});

router.get('/product-inventory', (req, res) => {
    Product.findAll({
        attributes: ['id', 'product_name'],


    })
  .then(dbPostData => {
    let parsePost =JSON.parse(JSON.stringify(dbPostData));
    let loginStatus;
    if (typeof req.session.passport != 'undefined') {
        loginStatus = req.session.passport.user.id;
    } else {
        loginStatus = false;
    }
    res.render('product-inventory', {parsePost,  loggedIn: loginStatus});

  })
  .catch(err => res.status(500).json(err));
});

router.get('/search', (req, res) => {
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'image'],


    })
  .then(dbPostData => {
    console.log("I am at search get")
    let parsePost =JSON.parse(JSON.stringify(dbPostData));
    console.log(parsePost)
    // console.log("search is : " + search)
    for (let i = 0; i < parsePost.length; i++){

    }
    let val = document.getElementById("#search-id").value;
    console.log("value is :" + val);

    res.render('search', {parsePost});

  })
  .catch(err => res.status(500).json(err));
});

router.get('/products-update/:id', (req, res) => {
    Product.findOne({
        
            where: {
              id: req.params.id
            }
        })  .then(dbUserData => {

            let loginStatus;
            if (typeof req.session.passport != 'undefined') {
                loginStatus = req.session.passport.user.id;
            } else {
                loginStatus = false;
            }
            res.render("products-update",{  loggedIn: loginStatus});
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
        });

router.get('/', (req, res) => {
    Product.findAll({
        where: {
            featured: true
        },
            attributes: [
                'id',
                'product_name',
                'price',
                'stock',
                'image'
            ],

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

router.get('/update-inventory', (req, res) => {
    res.render('update-inventory')
   })

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