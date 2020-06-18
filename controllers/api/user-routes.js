const router = require('express').Router();
// const { User } = require('../../models');

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'email']
    })
})