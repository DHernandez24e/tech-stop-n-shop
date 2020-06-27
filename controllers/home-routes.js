const router = require('express').Router();
const sequelize = require('../config/connection');
const { Op } = require('sequelize');

const {
    Product,
    User,
    Category,
    Product_Profit
} = require('../models');
const isAuth = require('../utils/middleware/isAuth');

//Profit page
router.get('/profit', isAuth, (req, res) => {
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
    console.log('WE GET HERE 2');
    let lengthTest = parsePost.length;
    console.log(`lengthTest is : ${lengthTest}`);
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
    console.log('WE GET HERE 4');
    res.render('profit', {parsePost, profitTotal, profitFlag, test2, loggedIn: loginStatus});
  })
  .catch(err => res.status(500).json(err));
});


//Inventory Page
router.get('/product-inventory', isAuth, (req, res) => {
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

//Update inventory
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


//Homepage/Featured items
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


//Update inventory page render
router.get('/update-inventory', isAuth, (req, res) => {
    res.render('update-inventory')
   })

//Checkout page render
router.get('/checkout', (req, res) => {
    res.render('checkout');
});

//Search 
router.get('/search/:query', (req, res) => {
    console.log("WE GET TO THE ROUTE");
    console.log("REQUEST.PARAMS", req.params);
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock', 'image', 'category_id'],
        where: {
            product_name: {
                [Op.like]: '%' + req.params.query + '%'
            }
        },
        include:
            [
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
        .then(dbProductData => {
            const products = dbProductData.map(products => products.get({
                plain: true
            }));

            let loginStatus;
            if (typeof req.session.passport != 'undefined') {
                loginStatus = req.session.passport.user.id;
            } else {
                loginStatus = false;
            }

            console.log('PRODUCTS', products);
            console.log('===========')
            console.log('LOGGED IN?', loginStatus);

            res.render('search', {
                products: products,
                loggedIn: loginStatus
            });
        })
        .catch(err => res.status(500).json(err));
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//Sign-up page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

//Products page
// router.get('/products', (req, res) => {
//     Product.findAll({
//         attributes: ['id', 'product_name', 'price', 'stock', 'image', 'category_id'],
//         include: {
//             model: Category,
//             attributes: ['id', 'category_name']
//         }
//     })
//     .then(dbPostData => {
//         const products = dbPostData.map(products => products.get({ plain: true }));

//         console.log(products)

//         let loginStatus;

//         if (typeof req.session.passport != 'undefined') {
//             loginStatus = req.session.passport.user.id;
//         } else {
//             loginStatus = false;
//         }

//         res.render('product-list', {
//             products, 
//             loggedIn: loginStatus
//         })
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err)
//     });
// });

//Categorize
router.get('/products/category/:id', (req, res) => {
    Category.findAll({
        where: {
            id: req.params.id
        },
        include: {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'image', 'category_id']
        }
    })
    .then(dbPostData => {
        const products = dbPostData.map(products => products.get({ plain: true }));

        console.log(products)
        console.log('test 1')

        const test = products.map(test => test.get({ plain: true }));

        console.log(test)

        let loginStatus;

        if (typeof req.session.passport != 'undefined') {
            loginStatus = req.session.passport.user.id;
        } else {
            loginStatus = false;
        }

        res.json(products)
        // res.render('product-list', {
        //     products, 
        //     loggedIn: loginStatus
        // })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router;