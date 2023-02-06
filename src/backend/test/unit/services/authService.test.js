process.env.JWT_SECRET = 'secret-key';
// const jwtGenerate = jest.fn(() => 'token-mock');
// const User = {
//   findOne: jest.fn(),
// };

// const authentication = async ({ email, password }) => {
//   User.findOne.mockClear();
//   jwtGenerate.mockClear();
  
//   const user = await User.findOne({ where: { email, password } });
//   if (!user) return null;
  
//   const response = jwtGenerate({ id: user.id, email: user.email });
//   return { token: response };
// };

// describe('authentication', () => {
//   it('returns the token when the user is found', async () => {
//     User.findOne.mockResolvedValue({ id: 1, email: 'user@example.com' });
//     const result = await authentication({ email: 'user@example.com', password: 'password' });
//     expect(result).toEqual({ token: 'token-mock' });
//     expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'user@example.com', password: 'password' } });
//     expect(jwtGenerate).toHaveBeenCalledWith({ id: 1, email: 'user@example.com' });
//   });

//   it('returns null when the user is not found', async () => {
//     User.findOne.mockResolvedValue(null);
//     const result = await authentication({ email: 'user@example.com', password: 'wrong-password' });
//     expect(result).toBeNull();
//     expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'user@example.com', password: 'wrong-password' } });
//     expect(jwtGenerate).not.toHaveBeenCalled();
//   });
// });

const { User } = require('../../../database/models');

jest.mock('../../../database/models', () => ({
  User: {
    findOne: jest.fn(),
  },
}));

const { authentication } = require('../../../services/authService');

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
