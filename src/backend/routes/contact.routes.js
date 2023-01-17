const express = require('express');
const { listContactsByUserId, createNewContact, updateContact }  = require('../controllers/contactController');
const { validatePhone, validateName, validateEmailIsInUseByOtherContact } = require('../middlewares/validation.contacts');
const validateToken = require('../middlewares/validate.jwt');

const contactRouter = express.Router();

contactRouter.get('/list-contacts', validateToken, listContactsByUserId);
contactRouter.post('/register', validateToken, validateName, validatePhone, validateEmailIsInUseByOtherContact, createNewContact);
contactRouter.put('/update', validateToken, validateName, validatePhone, validateEmailIsInUseByOtherContact, updateContact);

module.exports = contactRouter;