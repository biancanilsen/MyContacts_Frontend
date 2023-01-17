const contactService = require('../services/contactService')
const defaultApiReturn = require('../utils/defaultApiReturn');

const listContactsByUserId = async (req, res) => {
  try {
    const { id } = req.tokenData;
    const response = await contactService.listContactsByUserId({ id });
    return res.status(200).json(defaultApiReturn({ apiResponse: response }));
  } catch(e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

const createNewContact = async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;
    const { id } = req.tokenData;
    const response = await contactService.createNewContact({ nome, telefone, email, userId: id });
    if (!response) {
      return res.status(400).json(defaultApiReturn({ error: { message: 'Este contato já existe'} }));
    }
    return res.status(201).json(defaultApiReturn({}));
  } catch (e) {
    console.error(e.message);
    return res.status(500).json(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
  }
}

module.exports = {
  listContactsByUserId,
  createNewContact
};