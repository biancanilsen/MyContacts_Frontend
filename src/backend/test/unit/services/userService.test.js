process.env.JWT_SECRET = 'secret-key';

const User = {
  findOne: jest.fn(),
  create: jest.fn(),
};


const createNewUser = async ({ email, password }) => {
  const userExist = await User.findOne({ where: { email } });
  if (userExist) return null;
  const newUser = await User.create({ email, password });
  return newUser;
};

describe('createNewUser', () => {
  it('returns null when the user is found', async () => {
    User.findOne.mockResolvedValue(null);
    const result = await createNewUser({ email: 'user@example.com' });
    expect(result).toBe(undefined);
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'user@example.com' } });
  });

  it('creates a new user when the user is not found', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ email: 'newuser@example.com', password: 'secret' });
    const result = await createNewUser({ email: 'newuser@example.com', password: 'secret' });
    expect(result).toEqual({ email: 'newuser@example.com', password: 'secret' });
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'newuser@example.com' } });
    expect(User.create).toHaveBeenCalledWith({ email: 'newuser@example.com', password: 'secret' });
  });
});