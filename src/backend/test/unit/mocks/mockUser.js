const Sequelize = require('sequelize');
const User = require('../../../database/models/user');

const mockUser = jest.fn().mockImplementation(() => {
  return {
    define: jest.fn().mockReturnValue({
      associate: jest.fn()
    })
  };
});

const userFindOneModel = jest.mock('../../../database/models/user', () => {
  return {
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'password'
    })
  };
});

module.exports = mockUser;
module.exports = userFindOneModel;

