const router = require('express').Router();

const UserController = require('../controllers/users')

router.route('/')
    .get(UserController.getUsers)
    .post(UserController.addUser);

module.exports = router;