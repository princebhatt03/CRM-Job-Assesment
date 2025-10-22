import bcrypt from "bcrypt";
const saltRounds = 10;

const hashPassword = async (password) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(password, saltRounds));
  });
};

const comparePassword = async (password, hash) => {
  return new Promise((resolve) => {
    resolve(bcrypt.compareSync(password, hash));
  });
};

export { hashPassword, comparePassword };
