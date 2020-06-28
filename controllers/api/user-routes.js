const router = require('express').Router();
const { User } = require('../../models');
const passport = require('../../utils/passport');
const isAuth = require('../../utils/middleware/isAuth');

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    })
});

//GET single user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this id' });
            return
        }
        res.json(dbUserData)
    })
    .catch(err => res.status(500).json(err));
});

// use passport to authenticate login. if invalid credentials, passport will return unauthorized
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.render('homepage', {
      loggedIn: req.session.passport.user.id,
    });
  });

//POST create new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        dark_mode: false
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
    });

// Update user table with dark mode toggle preference. Successfully updates value in table, but future implementation needed to retreive value from table and load into localstorage on login
router.put('/dm', (req, res) => {
    if (typeof req.session.passport != 'undefined') {
        User.update({
            dark_mode: req.body.dark_mode
        }, 
        {
            where: {
                id: req.session.passport.user.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            console.log(`Successfully updated user table for ${req.session.passport.user.username} and dark mode is ${req.body.dark_mode}`)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

//PUT update user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.status(500).json(err));
});

//DELETE user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router