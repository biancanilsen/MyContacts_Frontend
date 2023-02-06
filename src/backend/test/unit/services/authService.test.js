process.env.JWT_SECRET = 'secret-key';
const { User } = require('../../../database/models');
const { authentication } = require('../../../services/authService');

jest.mock('../../../database/models', () => ({
  User: {
    findOne: jest.fn(),
  },
}));


describe('authentication', () => {
  beforeEach(() => {
    User.findOne.mockReset();
  });

  it('returns null when no user is found', async () => {
    User.findOne.mockResolvedValue(null);
    const result = await authentication({ email: 'test@example.com', password: 'password' });
    expect(result).toBe(null);
    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com', password: 'password' },
    });
  });

  it('returns a token when a user is found', async () => {
    User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });
    const result = await authentication({ email: 'test@example.com', password: 'password' });
    expect(result).toEqual({
      token: expect.any(String),
    });
    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com', password: 'password' },
    });
  });
});
