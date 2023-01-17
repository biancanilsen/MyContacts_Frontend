const express = require('express');
const { listContactsByUserId, createNewContact }  = require('../controllers/contactController');
const { validatePhone, validateName, validateEmailIsInUseByOtherContact } = require('../middlewares/validation.contacts');
const validateToken = require('../middlewares/validate.jwt');

const contactRouter = express.Router();

contactRouter.get('/list-contacts', validateToken, listContactsByUserId);
contactRouter.post('/register', validateToken, validateName, validatePhone, validateEmailIsInUseByOtherContact, createNewContact);

module.exports = contactRouter;