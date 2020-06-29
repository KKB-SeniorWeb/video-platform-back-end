const videoTable = require('../table/video.table');
module.exports = app => {
  const Video = app.model.define('video', videoTable(app.Sequelize));
  Video.associate = function() {
    app.model.Video.belongsToMany(app.model.Course, {
      through: 'courses_video',
      foreignKey: 'video_id'
    });
  };
  return Video;
};
