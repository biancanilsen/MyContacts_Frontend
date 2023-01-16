const { Router } = require ('express');
const userRouter = require('./user.routes');
const contactsRouter = require('./contact.routes');

const routerIndex = Router();
routerIndex.use('/user', userRouter);
routerIndex.use('/contacts', contactsRouter);

module.exports = routerIndex;