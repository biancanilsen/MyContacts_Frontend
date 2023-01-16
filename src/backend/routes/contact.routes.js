const express = require('express');
const { listContactsByUserId, createNewContact, updateContact, deleteContact }  = require('../controllers/contactController');
const { validatePhone, validateName, validateEmailIsInUseByOtherContact } = require('../middlewares/validation.contacts');
const validateToken = require('../middlewares/validate.jwt');

const contactRouter = express.Router();

contactRouter.post('/register', validateToken, validateName, validatePhone, validateEmailIsInUseByOtherContact, createNewContact);

module.exports = contactRouter;
