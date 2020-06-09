module.exports = {
  signupRequest: {
    username: { type: 'string', required: true, example: 'cuicuicui' },
    password: { type: 'string', required: true, example: 'ceshiceshi1' },
    confirmPassword: { type: 'string', required: true }
  },
  signinRequest: {
    username: { type: 'string', required: true, example: 'cuicuicui' },
    password: { type: 'string', required: true, example: 'ceshiceshi1' },
    longTimeSignin: { type: 'boolean', required: false, example: false }
  },
  uploadVideoRequest: {
    videoData: { type: 'files', required: true, example: '{}' },
    videoName: { type: 'string', required: true, example: 'videoName' },
    videoCover: { type: 'string', required: true, example: 'http://.....jpg' }
  },
  deleteVideoRequest: {
    paths: { type: 'object', required: true, example: '["http://...mp4", "http://...mp4"]' }
  },
  journalAddRequest: {
    id: { type: 'string', required: true, example: 'jiaochengid' },
    user_id: { type: 'string', required: true, example: 'yonghuid' },
    type: { type: 'int', required: false, example: 1 },
    start: { type: 'int', required: false, example: 59875846285748 },
    stop: { type: 'int', required: false, example: 84923789673 }
  },
  journalGetByIdRequest: {
    id: { type: 'string', required: true, example: '教程id' },
    type: { type: 'int', required: true, example: 1 },
    limit: { type: 'int', required: false, example: 20 },
    offset: { type: 'int', required: false, example: 1 }
  },
  journalGetByUserRequest: {
    user_id: { type: 'string', required: true, example: '用户id' },
    type: { type: 'int', required: true, example: 1 },
    limit: { type: 'int', required: false, example: 20 },
    offset: { type: 'int', required: false, example: 1 }
  }
};
