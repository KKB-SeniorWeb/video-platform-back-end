import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
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
  }
};

export default plugin;
