process.env.JWT_SECRET = 'secret-key';
const { Contacts } = require('../../../database/models');
const { listContactsByUserId, createNewContact, updateContact, deleteContact } = require('../../../services/contactService');;

jest.mock('../../../database/models', () => ({
  Contacts: {
    findAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn()
  }
}));

describe('listContactsByUserId', () => {
  beforeEach(() => {
    Contacts.findAll.mockReset();
  });

  it('Should return null when no contacts are found', async () => {
    Contacts.findAll.mockResolvedValue(null);
    const result = await listContactsByUserId({ id: 1 });
    expect(result).toBe(null);
    expect(Contacts.findAll).toHaveBeenCalledWith({
      where: { userId: 1, isActive: true },
      attributes: { exclude: ['userId', 'UserId', 'data_cadastro', 'data_alteração', 'isActive'] }
    });
  });

  it('Should return the list of contacts when they are found', async () => {
    const contacts = [
      { name: 'John Doe', email: 'johndoe@example.com' },
      { name: 'Jane Doe', email: 'janedoe@example.com' }
    ];
    Contacts.findAll.mockResolvedValue(contacts);
    const result = await listContactsByUserId({ id: 1 });
    expect(result).toEqual(contacts);
    expect(Contacts.findAll).toHaveBeenCalledWith({
      where: { userId: 1, isActive: true },
      attributes: { exclude: ['userId', 'UserId', 'data_cadastro', 'data_alteração', 'isActive'] }
    });
  });
});

describe('createNewContact', () => {
  beforeEach(() => {
    Contacts.create.mockReset();
  });

  it('Should create a new contact with the provided data', async () => {
    Contacts.create.mockResolvedValue({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', userId: 1 });
    const result = await createNewContact({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', userId: 1 });
    expect(result).toEqual({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', userId: 1 });
    expect(Contacts.create).toHaveBeenCalledWith({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', userId: 1 });
  });
});

describe('updateContact', () => {
  beforeEach(() => {
    Contacts.findOne.mockReset();
    Contacts.update.mockReset();
  });

  it('Should update an existing contact with the provided data', async () => {
    Contacts.findOne.mockResolvedValue({ nome: 'Jane Doe', telefone: '456789', email: 'janedoe@example.com', userId: 1 });
    Contacts.update.mockResolvedValue({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', data_alteracao: Date.now() });
    const result = await updateContact({ id: 1, nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com' });
    expect(result).toEqual({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', data_alteracao: expect.any(Number) });
    expect(Contacts.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(Contacts.update).toHaveBeenCalledWith({ nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com', data_alteracao: expect.any(Number) }, { where: { id: 1 } });
  });

  it('Should return null if the contact does not exist', async () => {
    Contacts.findOne.mockResolvedValue(null);
    const result = await updateContact({ id: 1, nome: 'John Doe', telefone: '123456', email: 'johndoe@example.com' });
    expect(result).toBe(null);
    expect(Contacts.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(Contacts.update).not.toHaveBeenCalled();
  });
});

describe('deleteContact', () => {
  beforeEach(() => {
    Contacts.findOne.mockReset();
    Contacts.update.mockReset();
  });

  it('Should delete a contact with the provided id and userId', async () => {
    Contacts.findOne.mockResolvedValue({ id: 1, userId: 1, isActive: true });
    Contacts.update.mockResolvedValue({ id: 1, userId: 1, isActive: false });
    const result = await deleteContact({ id: 1, userId: 1 });
    expect(result).toEqual({ id: 1, userId: 1, isActive: false });
    expect(Contacts.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: 1, isActive: true } });
    expect(Contacts.update).toHaveBeenCalledWith({ isActive: false }, { where: { id: 1, userId: 1 } });
  });

  it('Should return null if the contact with the provided id and userId doesn\'t exist', async () => {
    Contacts.findOne.mockResolvedValue(null);
    const result = await deleteContact({ id: 1, userId: 1 });
    expect(result).toBeNull();
    expect(Contacts.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: 1, isActive: true } });
    expect(Contacts.update).not.toHaveBeenCalled();
  });
});