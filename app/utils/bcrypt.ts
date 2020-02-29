/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');

const saltRounds = 10;
export const hashSync = data => {
  return bcrypt.hashSync(data, saltRounds);
};

export const compareSync = (data, encrypted) => {
  return bcrypt.compareSync(data, encrypted);
};
