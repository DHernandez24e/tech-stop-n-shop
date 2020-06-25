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
    // serialize data before passing to template
    // const posts = dbPostData;  
    // console.log(dbPostData);
    let test2 = JSON.stringify(dbPostData);
    let parsePost =JSON.parse(JSON.stringify(dbPostData));
    console.log(parsePost);
    // let test1 = "hi";
    // let test2 = "hey";
    // console.log(parsePost[0].product_profits[0].num_sold);
    let test = parsePost[1].products[0].product_profits[0].num_sold;
    let lengthTest = parsePost.length;
    console.log("lengthTest is :");
    console.log(test)
    var soldTimesCost = 0
    var inventTimesCost = 0
    var soldTimesPrice = 0
    // for (let i = 0; i < parsePost.length; i++) {
    //     sumSold[i] = 0;
    //     sumInvent[i] = 0;
    //     // console.log(sumSold[i])
    //     // console.log(sumInvent[i])
    // }

    for (let i = 0; i < parsePost.length; i++) {

        for (let j = 0; j < parsePost[i].products.length; j++) {
        soldTimesCost = soldTimesCost + parsePost[i].products[j].product_profits[0].num_sold*parsePost[i].products[j].product_profits[0].cost;
        inventTimesCost = inventTimesCost + parsePost[i].products[j].stock*parsePost[i].products[j].product_profits[0].cost;
        soldTimesPrice = soldTimesPrice + parsePost[i].products[j].product_profits[0].num_sold*parsePost[i].products[j].price;

        // console.log(parsePost[i].products[j].product_profits[0].num_sold)
        // console.log(parsePost[i].products[j].stock)
        // console.log(sumSold[i])
        // console.log(sumInvent[i])
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


    // var arraySumSold = []
    // var arraySumInvent = []
    // for (let i = 0; i < parsePost.length; i++) {
    //     console.log(sumSold[i])
    //     console.log(sumInvent[i])
    //     arraySumSold.push(sumSold[i])
    //     arraySumInvent.push(sumInvent[i])
    // }

    
    // let objSumSold = []
    // let objSumInvent = []
    // console.log (arraySumSold)
    // console.log(arraySumInvent)
    // parsePost = parsePost.push(objSumSold)
    // parsePost = parsePost.push(objSumInvent)

    // parsePost['objSumSold'].push(arraySumSold)
    // parsePost['objSumInvent'].push(arraySumInvent)
    console.log(parsePost)

    // console.log("online 34", JSON.stringify(dbPostData));
    // const hi = new dbPostData[0].product
    // console.log(hi);
    let loginStatus;
    if (typeof req.session.passport != 'undefined') {
        loginStatus = req.session.passport.user.id;
    } else {
        loginStatus = false;
    }
    res.render('profit', {parsePost, profitTotal, profitFlag, test2, loggedIn: loginStatus});
    // const posts = "hello";
    // res.render('profit', {posts: "hello"});
  })
  .catch(err => res.status(500).json(err));
});

router.get('/product-inventory', (req, res) => {
    Product.findAll({
        attributes: ['id', 'product_name'],
        // include: 
        // [
        // {
        //     model: Product,
        //     attributes: ['product_name', 'price', 'stock'],
        //     include: {
        //         model: Product_Profit,
        //         attributes: ['num_sold','cost']
        //       }
        // },

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
    // const posts = "hello";
    // res.render('profit', {posts: "hello"});
  })
  .catch(err => res.status(500).json(err));
});

router.get('/products-update/:id', (req, res) => {
    Product.findOne({
        
            where: {
              id: req.params.id
            }
        })  .then(dbUserData => {
            // if (!dbUserData) {
            //   res.status(404).json({ message: 'No user found with this id' });
            //   return;
            // }
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

//Products page
router.get('/products', (req, res) => {
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock', 'image']
    })
    .then(dbPostData => {
        const products = dbPostData.map(products => products.get({ plain: true }));

        res.render('product-list', {
            products
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router;