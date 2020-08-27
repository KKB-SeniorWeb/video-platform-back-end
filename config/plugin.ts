import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc'
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },

  validate: {
    enable: true,
    package: 'egg-validate'
  },

  jwt: {
    enable: true,
    package: 'egg-jwt'
  }
};

export default plugin;
