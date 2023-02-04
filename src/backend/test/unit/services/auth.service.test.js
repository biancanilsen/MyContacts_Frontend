process.env.JWT_SECRET = 'secret-key';

const { User } = require('../../../database/models');
const { authentication } = require('../../../services/authService');
jwtGenerate = jest.fn(() => 'mocked-token');


jest.mock('../../../database/models', () => {
  return {
    User: {
      findOne: jest.fn()
    }
  };
});

describe('authentication', () => {
  it('returns a token when the user is found', async () => {
    User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });

    const result = await authentication({ email: 'test@example.com', password: 'password' });

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com', password: 'password' } });
    expect(jwtGenerate).toHaveBeenCalledWith({ email: 'test@example.com', id: 1 });
    expect(result).toEqual({ token: 'mocked-token' });
  });

  it('returns null if user is not found', async () => {
    User.findOne.mockResolvedValue(null);
    const response = await authentication({ email: 'test@example.com', password: 'password' });
    expect(response).toBeNull();
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com', password: 'password' } });
  });
});
