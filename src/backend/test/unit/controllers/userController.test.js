const UserController  = require('../../../controllers/userController');
const userService = require('../../../services/userService');
const defaultApiReturn = require('../../../utils/defaultApiReturn');

jest.mock('../../../services/userService', () => {
  return {
    createNewUser: jest.fn()
  };
});

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('UserController', () => {
    it('Should create a new user with the provided data', async () => {
      const req = {
        body: {
          email: 'johndoe@example.com',
          password: 'secret123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userService.createNewUser.mockResolvedValue({});
  
      await UserController(req, res);
  
      expect(userService.createNewUser).toHaveBeenCalledWith({ email: 'johndoe@example.com', password: 'secret123' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(defaultApiReturn({}));
    });
  
    it('Should return an error if the email is already registered', async () => {
      const req = {
        body: {
          email: 'johndoe@example.com',
          password: 'secret123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userService.createNewUser.mockResolvedValue(null);
  
      await UserController(req, res);
  
      expect(userService.createNewUser).toHaveBeenCalledWith({ email: 'johndoe@example.com', password: 'secret123' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(defaultApiReturn({ error: { message: 'E-mail já cadastrado'} }));
    });
  
    it('Should return an error if something goes wrong', async () => {
      const req = {
        body: {
          email: 'johndoe@example.com',
          password: 'secret123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userService.createNewUser.mockRejectedValue(new Error('Something went wrong'));
  
      await UserController(req, res);
  
      expect(userService.createNewUser).toHaveBeenCalledWith({ email: 'johndoe@example.com', password: 'secret123' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(defaultApiReturn({ error: { message: 'Algo deu errado, tente novamente.' } }));
    });
  });