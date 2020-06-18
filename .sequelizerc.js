'use strict';

const path = require('path');
const getConfig = require('./database/config/config.js');
module.exports = {
  config: getConfig(),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'app/model')
};
