const express = require('express');
const UserController = require ('../controllers/userController');
const LoginController = require('../controllers/loginController');
const { validateEmail, validadePassword} = require('../middlewares/validation.login');

const userRouter = express.Router();

userRouter.post('/register', validateEmail, validadePassword, UserController);
userRouter.post('/login', validateEmail, validadePassword, LoginController);

module.exports = userRouter;