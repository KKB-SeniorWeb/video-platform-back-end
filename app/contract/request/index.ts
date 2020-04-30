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
  addCourseRequest:{
    id:{type:'string',required: true, example: '1209384gjonsd'},
    userId:{type:'string',required: true, example: 'fklscrirp39iu598tejofs'}
  }
};
