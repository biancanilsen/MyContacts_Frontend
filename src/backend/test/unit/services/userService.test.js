process.env.JWT_SECRET = 'secret-key';
const { User } = require('../../../database/models');

jest.mock('../../../database/models', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

const { createNewUser } = require('../../../services/userService');

describe('createNewUser', () => {
  beforeEach(() => {
    User.findOne.mockReset();
    User.create.mockReset();
  });

  it('returns null when a user with the same email already exists', async () => {
    User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });
    const result = await createNewUser({ email: 'test@example.com', password: 'password' });
    expect(result).toBe(null);
    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(User.create).not.toHaveBeenCalled();
  });

  it('creates a new user when the email is not in use', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ id: 1, email: 'test@example.com', password: 'password' });
    const result = await createNewUser({ email: 'test@example.com', password: 'password' });
    expect(result).toEqual({ id: 1, email: 'test@example.com', password: 'password' });
    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(User.create).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
  });
});