// eslint-disable-next-line @typescript-eslint/no-var-requires
const videoTable = require('../table/video.table');
module.exports = app => {
  const Video = app.model.define('video', videoTable(app.Sequelize));
  return Video;
};
