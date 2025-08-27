import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    console.log('>>> Error hash password  ', error);
  }
};

export const comparePasswordHelper = async (
  plainPassword: string,
  hasPassword: string,
) => {
  try {
    return await bcrypt.compare(plainPassword, hasPassword);
  } catch (error) {
    console.log('>>> Error compare password  ', error);
  }
};
