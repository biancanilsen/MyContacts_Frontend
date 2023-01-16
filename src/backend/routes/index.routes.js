const { Router } = require ('express');
const userRouter = require('./user.routes');

const routerIndex = Router();
routerIndex.use('/user', userRouter);

module.exports = routerIndex;