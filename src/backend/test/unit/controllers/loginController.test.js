const authService = require('../../../services/authService');
const defaultApiReturn = require('../../../utils/defaultApiReturn');
const LoginController = require('../../../controllers/loginController');

jest.mock('../../../services/authService');
jest.mock('../../../utils/defaultApiReturn');

describe('LoginController', () => {
  it('returns 404 if authentication fails', async () => {
    authService.authentication.mockReturnValueOnce(false);

    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await LoginController(req, res);

    expect(authService.authentication).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(defaultApiReturn).toHaveBeenCalledWith({ error: { message: 'Usuário não encontrado' } });
  });

  it('returns 200 if authentication succeeds', async () => {
    authService.authentication.mockReturnValueOnce({ data: 'some data' });

    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };

    await LoginController(req, res);

    expect(authService.authentication).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(defaultApiReturn).toHaveBeenCalledWith({ apiResponse: { data: 'some data' } });
  });
});